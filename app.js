const API_BASE_URL = "https://zmp5uhxse0.execute-api.ap-southeast-1.amazonaws.com/prod/LebalAuthCodeSystem";
const DEMO_CODE = "XAJI0Y6DPBHS";
const DEFAULT_LANG = localStorage.getItem("lebal_lang") || "zh-Hant";

const codeInput = document.getElementById("codeInput");
const searchBtn = document.getElementById("searchBtn");
const statusCard = document.getElementById("statusCard");
const statusBadge = document.getElementById("statusBadge");
const statusMessage = document.getElementById("statusMessage");
const resultCard = document.getElementById("resultCard");
const productTitle = document.getElementById("productTitle");
const recordStatusPill = document.getElementById("recordStatusPill");
const langButtons = document.querySelectorAll(".lang-btn");

const fieldIds = [
  "anti_counterfeit_code",
  "company_name",
  "product_name",
  "batch_no",
  "manufacture_date",
  "expiry_date",
  "market",
  "manufacturing_site",
  "label_type",
  "record_status",
  "remarks"
];

const messages = {
  en: {
    heroTitle: "Anti-Counterfeit Verification",
    heroSubtitle: "Fast, secure and trusted product authentication.",
    verifyTitle: "Verify Code",
    verifyInstruction: "Please enter your anti-counterfeit verification code.",
    inputPlaceholder: "Enter anti-counterfeit code",
    searchBtn: "Search",
    tryDemo: "Try Demo Code",
    resultLabel: "Verification Result",
    anti_counterfeit_code: "Anti-counterfeit Code",
    company_name: "Company Name",
    product_name: "Product Name",
    batch_no: "Batch No",
    manufacture_date: "Manufacture Date",
    expiry_date: "Expiry Date",
    market: "Market",
    manufacturing_site: "Manufacturing Site",
    label_type: "Label Type",
    record_status: "Record Status",
    remarks: "Remarks",
    status: {
      loading: "Loading",
      success: "Verified",
      error: "Error",
      warning: "Warning"
    },
    feedback: {
      noCode: "Please enter an anti-counterfeit code.",
      loading: "Verifying code and loading product data...",
      success: (code) => `Code ${code} has been successfully verified.`,
      failed: "Verification failed or code not found.",
      connectionError: "Unable to connect to verification service.",
      verifiedProduct: "Verified Product",
      productInfo: "Product Information"
    }
  },
  "zh-Hant": {
    heroTitle: "防偽驗證系統",
    heroSubtitle: "快速、安全、可信賴的產品真偽驗證體驗。",
    verifyTitle: "查驗防偽碼",
    verifyInstruction: "請輸入您的防偽驗證碼。",
    inputPlaceholder: "請輸入防偽碼",
    searchBtn: "查詢",
    tryDemo: "試用 Demo Code",
    resultLabel: "驗證結果",
    anti_counterfeit_code: "防偽碼",
    company_name: "公司名稱",
    product_name: "產品名稱",
    batch_no: "批次號",
    manufacture_date: "製造日期",
    expiry_date: "有效日期",
    market: "市場",
    manufacturing_site: "生產地",
    label_type: "標籤類型",
    record_status: "紀錄狀態",
    remarks: "備註",
    status: {
      loading: "處理中",
      success: "已驗證",
      error: "錯誤",
      warning: "提醒"
    },
    feedback: {
      noCode: "請先輸入防偽碼。",
      loading: "正在驗證防偽碼並載入產品資料...",
      success: (code) => `代碼 ${code} 已成功完成驗證。`,
      failed: "驗證失敗，或查無此代碼。",
      connectionError: "目前無法連線到驗證服務。",
      verifiedProduct: "已驗證產品",
      productInfo: "產品資訊"
    }
  },
  "zh-Hans": {
    heroTitle: "防伪验证系统",
    heroSubtitle: "快速、安全、可信赖的产品真伪验证体验。",
    verifyTitle: "验证防伪码",
    verifyInstruction: "请输入您的防伪验证码。",
    inputPlaceholder: "请输入防伪码",
    searchBtn: "查询",
    tryDemo: "试用 Demo Code",
    resultLabel: "验证结果",
    anti_counterfeit_code: "防伪码",
    company_name: "公司名称",
    product_name: "产品名称",
    batch_no: "批次号",
    manufacture_date: "生产日期",
    expiry_date: "有效日期",
    market: "市场",
    manufacturing_site: "生产地",
    label_type: "标签类型",
    record_status: "记录状态",
    remarks: "备注",
    status: {
      loading: "处理中",
      success: "已验证",
      error: "错误",
      warning: "提示"
    },
    feedback: {
      noCode: "请先输入防伪码。",
      loading: "正在验证防伪码并载入产品资料...",
      success: (code) => `代码 ${code} 已成功完成验证。`,
      failed: "验证失败，或未找到该代码。",
      connectionError: "目前无法连接到验证服务。",
      verifiedProduct: "已验证产品",
      productInfo: "产品信息"
    }
  },
  ja: {
    heroTitle: "真贋認証システム",
    heroSubtitle: "高速・安全・信頼性の高い製品認証体験。",
    verifyTitle: "コード認証",
    verifyInstruction: "認証コードを入力してください。",
    inputPlaceholder: "認証コードを入力してください",
    searchBtn: "検索",
    tryDemo: "デモコードを試す",
    resultLabel: "認証結果",
    anti_counterfeit_code: "認証コード",
    company_name: "会社名",
    product_name: "製品名",
    batch_no: "ロット番号",
    manufacture_date: "製造日",
    expiry_date: "有効期限",
    market: "市場",
    manufacturing_site: "製造拠点",
    label_type: "ラベル種別",
    record_status: "記録状態",
    remarks: "備考",
    status: {
      loading: "読み込み中",
      success: "認証済み",
      error: "エラー",
      warning: "注意"
    },
    feedback: {
      noCode: "認証コードを入力してください。",
      loading: "コードを認証し、製品データを読み込んでいます...",
      success: (code) => `コード ${code} は正常に認証されました。`,
      failed: "認証に失敗したか、コードが見つかりませんでした。",
      connectionError: "認証サービスに接続できません。",
      verifiedProduct: "認証済み製品",
      productInfo: "製品情報"
    }
  },
  ko: {
    heroTitle: "정품 인증 시스템",
    heroSubtitle: "빠르고 안전하며 신뢰할 수 있는 제품 인증 경험.",
    verifyTitle: "코드 확인",
    verifyInstruction: "정품 인증 코드를 입력해 주세요.",
    inputPlaceholder: "정품 코드를 입력하세요",
    searchBtn: "검색",
    tryDemo: "데모 코드 사용",
    resultLabel: "인증 결과",
    anti_counterfeit_code: "정품 코드",
    company_name: "회사명",
    product_name: "제품명",
    batch_no: "배치 번호",
    manufacture_date: "제조일",
    expiry_date: "만료일",
    market: "시장",
    manufacturing_site: "생산지",
    label_type: "라벨 유형",
    record_status: "기록 상태",
    remarks: "비고",
    status: {
      loading: "처리 중",
      success: "인증 완료",
      error: "오류",
      warning: "안내"
    },
    feedback: {
      noCode: "정품 코드를 먼저 입력해 주세요.",
      loading: "코드를 확인하고 제품 데이터를 불러오는 중입니다...",
      success: (code) => `코드 ${code} 인증이 완료되었습니다.`,
      failed: "인증에 실패했거나 코드를 찾을 수 없습니다.",
      connectionError: "인증 서비스에 연결할 수 없습니다.",
      verifiedProduct: "인증된 제품",
      productInfo: "제품 정보"
    }
  }
};

let currentLang = messages[DEFAULT_LANG] ? DEFAULT_LANG : "zh-Hant";

function t(path) {
  const parts = path.split(".");
  let value = messages[currentLang];

  for (const part of parts) {
    value = value?.[part];
  }

  return value ?? path;
}

function applyLanguage(lang) {
  currentLang = messages[lang] ? lang : "zh-Hant";
  localStorage.setItem("lebal_lang", currentLang);
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  if (!resultCard.classList.contains("hidden") && productTitle.textContent === "Product Information") {
    productTitle.textContent = t("feedback.productInfo");
  }
}

function setStatus(type, message) {
  statusCard.classList.remove("hidden");
  statusBadge.className = "status-badge";
  statusBadge.classList.add(`status-${type}`);
  statusBadge.textContent = t(`status.${type}`);
  statusMessage.textContent = message;
}

function hideStatus() {
  statusCard.classList.add("hidden");
}

function clearResult() {
  resultCard.classList.add("hidden");
  productTitle.textContent = t("feedback.productInfo");
  recordStatusPill.textContent = "-";

  fieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = "-";
  });
}

function renderResult(data) {
  resultCard.classList.remove("hidden");
  productTitle.textContent = data.product_name || t("feedback.verifiedProduct");
  recordStatusPill.textContent = data.record_status || "-";

  fieldIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = data[id] ?? "-";
  });
}

function getCodeFromPath() {
  const path = window.location.pathname.trim();
  if (!path || path === "/") return "";

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return "";

  const lastSegment = decodeURIComponent(segments[segments.length - 1]).trim();

  if (!lastSegment) return "";
  if (lastSegment.toLowerCase() === "index.html") return "";

  return lastSegment;
}

function getCodeFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("code") || "").trim();
}

async function verifyCode(code) {
  if (!code) {
    clearResult();
    setStatus("warning", t("feedback.noCode"));
    return;
  }

  clearResult();
  setStatus("loading", t("feedback.loading"));

  try {
    const url = `${API_BASE_URL}?code=${encodeURIComponent(code)}`;
    const response = await fetch(url, { method: "GET" });
    const result = await response.json();

    if (!response.ok || !result.success) {
      setStatus("error", result.message || t("feedback.failed"));
      return;
    }

    renderResult(result.data);
    setStatus("success", t("feedback.success")(code));
  } catch (error) {
    console.error(error);
    setStatus("error", t("feedback.connectionError"));
  }
}

searchBtn.addEventListener("click", () => {
  verifyCode(codeInput.value.trim());
});

codeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    verifyCode(codeInput.value.trim());
  }
});

document.querySelectorAll("[data-code]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const code = btn.getAttribute("data-code") || DEMO_CODE;
    codeInput.value = code;
    verifyCode(code);
  });
});

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.dataset.lang);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);
  clearResult();

  const queryCode = getCodeFromQuery();
  const pathCode = getCodeFromPath();
  const autoCode = queryCode || pathCode;

  if (autoCode) {
    codeInput.value = autoCode;
    verifyCode(autoCode);
  } else {
    hideStatus();
    codeInput.value = DEMO_CODE;
  }
});