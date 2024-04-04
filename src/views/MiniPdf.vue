<template>
  <div class="pdfContainer" style="text-align: center">
    <div v-if="!isFile">
      <label for="choice">개별 선택</label>
      <input type="radio" name="selectionType" id="choice" v-model="selectionType" value="choice" />
      <label for="range">범위 선택</label>
      <input type="radio" name="selectionType" id="range" v-model="selectionType" value="range" />
    </div>
    <ul class="tool-bar" style="display: flex; justify-content: center; list-style-type: none; gap: 10px">
      <li>
        <input type="file" accept=".pdf" @change="changeFile" />
      </li>
      <li v-if="isFile && selectionType == 'choice'">
        <button @click="page = page > 1 ? page - 1 : page">Prev</button>
        <input
          type="text"
          :value="page"
          @keydown.enter="changePage"
          @focusout="resetPage"
          style="width: 50px; text-align: right"
        />
        /
        {{ pages }}
        <button @click="page = page < pages ? page + 1 : page">Next</button>
      </li>
      <li v-if="isFile">
        <button @click="scale = scale > 1 ? scale - 0.5 : scale">-</button>
        <span for="magnification">{{ Math.round(scale * 100) }}%</span>
        <button @click="scale = scale < 4 ? scale + 0.5 : scale">+</button>
      </li>
      <li v-if="isFile && selectionType == 'choice'">
        <span>선택 : {{ selectedPage.map((v) => v.page) }}</span>
        <button @click="selectChoicePage">선택</button>
      </li>
      <li v-if="isFile && selectionType == 'range'">
        <span style="color: red">* 과도한 조정 시 오버플로우가 발생합니다. </span>전체 페이지 :{{ pages }}
      </li>
      <li v-if="isFile && selectionType == 'range'">
        <label for="startPage">Start Page:</label>
        <input
          type="text"
          id="startPage"
          :value="startPage"
          @keydown.enter="updateStartPages"
          @focusout="resetStartPage"
        />
      </li>
      <li v-if="isFile && selectionType == 'range'">
        <label for="lastPage">Last Page:</label>
        <input type="text" id="lastPage" :value="lastPage" @keydown.enter="updateLastPages" @focusout="resetLastPage" />
      </li>
      <li v-if="isFile && selectionType == 'choice'">
        <button @click="exportChoiceHTML">내보내기</button>
      </li>
      <li v-if="isFile && selectionType == 'range'">
        <button @click="exportRangeHTML">내보내기</button>
        <span style="color: red"> * 렌더링이 완료되면 눌러주세요. </span>
      </li>
    </ul>
    <div
      v-if="selectionType == 'range'"
      class="content"
      ref="content"
      :style="{ width: 'fit-content', margin: '0 auto' }"
    >
      <div class="pdf_wrap" v-for="page in filteredPages" :key="page">
        <VuePDF ref="vuePDFRef" :scale="scale" :pdf="pdf" :page="page" text-layer />
      </div>
    </div>
    <div
      v-if="selectionType == 'choice'"
      class="content"
      ref="content"
      :style="{ width: 'fit-content', margin: '0 auto' }"
    >
      <VuePDF ref="vuePDFRef" :scale="scale" :pdf="pdf" :page="page" text-layer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { VuePDF, usePDF } from "@tato30/vue-pdf";
import JSZip from "jszip";
import cssContent from "../css/pdf/style";
const file = ref(null);
const { pdf, pages } = usePDF(file);

const scale = ref(1);
const page = ref(1);
const fileName = ref("");
const isFile = ref(false);
const selectedPage = ref([]);
const selectionType = ref("choice");

// common START
function changeFile(event) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = URL.createObjectURL(selectedFile);
    fileName.value = selectedFile.name.split(".").slice(0, -1).join(".");
    isFile.value = true;
  }
}

onMounted(() => {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === "BR") {
            node.remove();
          }
        });
      }
    });
  });

  const contentElement = document.querySelector(".content");
  observer.observe(contentElement, { childList: true, subtree: true });
});

let isCtrl = false;

document.addEventListener("keydown", function (e) {
  if (e.which === 17) {
    isCtrl = true;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.which === 17) {
    isCtrl = false;
  }
});

document.addEventListener(
  "wheel",
  function (e) {
    if (isCtrl) {
      e.preventDefault();
      if (e.deltaY > 0) {
        if (scale.value > 1) {
          scale.value -= 0.5;
        }
      } else if (e.deltaY < 0) {
        if (scale.value < 4) {
          scale.value += 0.5;
        }
      }
    }
  },
  { passive: false }
);

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey) {
    if (e.key === "-") {
      e.preventDefault();
      if (scale.value > 1) {
        scale.value -= 0.5;
      }
    } else if (e.key === "=" || e.key === "+") {
      e.preventDefault();
      if (scale.value < 4) {
        scale.value += 0.5;
      }
    }
  }
});

// common END

// 개별 선택 START
const startPage = ref(1);
const lastPage = ref(5);

function changePage(e) {
  e.target.value > pages.value || e.target.value < 1 ? (e.target.value = page.value) : (page.value = +e.target.value);
}

function resetPage(e) {
  e.target.value = page.value;
}

const filteredPages = computed(() => {
  const filtered = [];
  for (let page = startPage.value; page <= lastPage.value; page++) {
    filtered.push(page);
  }
  return filtered;
});

function selectChoicePage() {
  const a = document.querySelector("canvas");
  const canvasDataURL = a.toDataURL();

  selectedPage.value.push({
    page: page.value,
    data: canvasDataURL,
  });
}

function exportChoiceHTML() {
  const zip = new JSZip(); // ZIP 객체 생성

  selectedPage.value.forEach((v) => {
    // 페이지 별로 HTML 복제 및 수정
    const contentHTML = document.querySelector("html").cloneNode(true);
    const elementsToRemove = contentHTML.querySelectorAll(
      "#header, .tool-bar, script, style, .v-overlay-container, link[href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'], link[href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap'], noscript"
    );
    const elementsToRemoveClasses = contentHTML.querySelectorAll(".v-application");
    const elementsToRemoveStyle = contentHTML.querySelectorAll(".v-main");
    elementsToRemoveClasses.forEach((element) => {
      element.classList = "";
    });
    elementsToRemove.forEach((element) => element.parentNode.removeChild(element));
    elementsToRemoveStyle.forEach((element) => {
      element.removeAttribute("style");
    });

    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "./css/common.css";
    contentHTML.querySelector("head").appendChild(linkElement);

    // 페이지 제목 설정
    contentHTML.querySelector("title").textContent = `${fileName.value}_${String(v.page).padStart(3, "0")}`;

    // 스크립트 직접 추가
    const scriptContent = `
            let canvas = document.querySelector("canvas");
            const context = canvas.getContext("2d");
            const base_image = new Image();
            base_image.src = "${v.data}";
            base_image.onload = function () {
                canvas.width = base_image.width;
                canvas.height = base_image.height;
                context.drawImage(base_image, 0, 0);
            };
        `;
    const scriptFileName = `${fileName.value}_${String(v.page).padStart(3, "0")}.js`;
    zip.folder("js").file(scriptFileName, scriptContent);

    const scriptElement = document.createElement("script");
    scriptElement.src = `./js/${scriptFileName}`;
    contentHTML.querySelector("body").appendChild(scriptElement);

    // Blob 생성 및 ZIP 파일에 추가
    const blob = new Blob([contentHTML.innerHTML], { type: "text/html" });
    zip.file(`${fileName.value}_${String(v.page).padStart(3, "0")}.html`, blob);
  });

  zip.folder("css").file("common.css", cssContent);

  zip.generateAsync({ type: "blob" }).then((resZip) => {
    const url = URL.createObjectURL(resZip);
    const aTag = document.createElement("a");

    aTag.download = fileName.value;
    aTag.href = url;
    aTag.click();
  });
}
// 개별 선택 END

// 범위 선택 START
function updateStartPages(e) {
  if (e.target.value > pages.value || e.target.value < 1 || e.target.value > lastPage.value) {
    e.target.value = startPage.value;
  } else {
    startPage.value = +e.target.value;
  }
}
function updateLastPages(e) {
  if (e.target.value > pages.value || e.target.value < 1 || e.target.value < startPage.value) {
    e.target.value = lastPage.value;
  } else {
    lastPage.value = +e.target.value;
  }
}
function resetStartPage(e) {
  e.target.value = startPage.value;
}
function resetLastPage(e) {
  e.target.value = startPage.value;
}

function exportRangeHTML() {
  const zip = new JSZip();
  filteredPages.value.forEach((v, i) => {
    const contentHTML = document.querySelector("html").cloneNode(true);
    const elementsToRemove = contentHTML.querySelectorAll(
      "#header, .tool-bar, script, style, .pdf_wrap, .v-overlay-container, link[href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css'], link[href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap'], noscript"
    );
    const elementsToRemoveClasses = contentHTML.querySelectorAll(".v-application");
    const elementsToRemoveStyle = contentHTML.querySelectorAll(".v-main");
    elementsToRemoveClasses.forEach((element) => {
      element.classList = "";
    });
    elementsToRemove.forEach((element) => element.parentNode.removeChild(element));
    elementsToRemoveStyle.forEach((element) => {
      element.removeAttribute("style");
    });

    const _pdf = document.querySelectorAll(".pdf_wrap");
    const pdfWrap = _pdf[i].cloneNode(true);
    contentHTML.querySelector(".content").appendChild(pdfWrap);

    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "./css/common.css";
    contentHTML.querySelector("head").appendChild(linkElement);

    contentHTML.querySelector("title").textContent = `${fileName.value}_${String(v).padStart(3, "0")}`;
    const canvas = document.querySelectorAll("canvas")[i];
    const scriptContent = `
            let canvas = document.querySelector("canvas");
            const context = canvas.getContext("2d");
            const base_image = new Image();
            base_image.src = "${canvas.toDataURL()}";
            base_image.onload = function () {
                canvas.width = base_image.width;
                canvas.height = base_image.height;
                context.drawImage(base_image, 0, 0);
            };
        `;
    const scriptFileName = `${fileName.value}_${String(v).padStart(3, "0")}.js`;
    zip.folder("js").file(scriptFileName, scriptContent);

    const scriptElement = document.createElement("script");
    scriptElement.src = `./js/${scriptFileName}`;
    contentHTML.querySelector("body").appendChild(scriptElement);

    // Blob 생성 및 ZIP 파일에 추가
    const blob = new Blob([contentHTML.innerHTML], { type: "text/html" });
    zip.file(`${fileName.value}_${String(v).padStart(3, "0")}.html`, blob);
  });

  zip.folder("css").file("common.css", cssContent);

  zip.generateAsync({ type: "blob" }).then((resZip) => {
    const url = URL.createObjectURL(resZip);
    const aTag = document.createElement("a");

    aTag.download = fileName.value;
    aTag.href = url;
    aTag.click();
  });
}

// 범위 선택 END
</script>

<script>
export default {
  name: "MiniPdf",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped></style>

<style lang="css">
@import "../css/pdf/annotationLayer.css";
</style>
