var fuse;
var showButton = document.getElementById("search-button");
var showButtonMobile = document.getElementById("search-button-mobile");
var hideButton = document.getElementById("close-search-button");
var wrapper = document.getElementById("search-wrapper");
var modal = document.getElementById("search-modal");
var input = document.getElementById("search-query");
var output = document.getElementById("search-results");
var statusEl = document.getElementById("search-status");
var first = null;
var last = null;
var searchVisible = false;
var indexed = false;
var indexing = false;
var indexFailed = false;
var queuedTerm = "";
var hasResults = false;

showButton ? showButton.addEventListener("click", displaySearch) : null;
showButtonMobile ? showButtonMobile.addEventListener("click", displaySearch) : null;
hideButton ? hideButton.addEventListener("click", hideSearch) : null;
wrapper ? wrapper.addEventListener("click", hideSearch) : null;
modal
  ? modal.addEventListener("click", function (event) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    })
  : null;

document.addEventListener("keydown", function (event) {
  if (event.key === "/") {
    const active = document.activeElement;
    const tag = active ? active.tagName : "";
    const isInputField = tag === "INPUT" || tag === "TEXTAREA" || active.isContentEditable;

    if (!searchVisible && !isInputField) {
      event.preventDefault();
      displaySearch();
    }
  }

  if (event.key === "Escape") {
    hideSearch();
  }

  if (event.key === "ArrowDown") {
    if (searchVisible && hasResults) {
      event.preventDefault();
      if (document.activeElement === input) {
        first.focus();
      } else if (document.activeElement === last) {
        last.focus();
      } else {
        document.activeElement.parentElement.nextSibling.firstElementChild.focus();
      }
    }
  }

  if (event.key === "ArrowUp") {
    if (searchVisible && hasResults) {
      event.preventDefault();
      if (document.activeElement === input || document.activeElement === first) {
        input.focus();
      } else {
        document.activeElement.parentElement.previousSibling.firstElementChild.focus();
      }
    }
  }

  if (event.key === "Enter") {
    if (searchVisible && hasResults) {
      event.preventDefault();
      if (document.activeElement === input) {
        first.focus();
      } else {
        document.activeElement.click();
      }
    }
  }
});

if (input) {
  input.addEventListener("input", function () {
    executeQuery(this.value);
  });
}

function displaySearch() {
  if (!indexed && !indexing && !indexFailed) {
    buildIndex();
  }
  if (!searchVisible) {
    document.body.style.overflow = "hidden";
    wrapper.style.visibility = "visible";
    input.focus();
    searchVisible = true;
  }
}

function hideSearch() {
  if (searchVisible) {
    document.body.style.overflow = "visible";
    wrapper.style.visibility = "hidden";
    input.value = "";
    output.innerHTML = "";
    setStatus("");
    document.activeElement.blur();
    searchVisible = false;
    hasResults = false;
  }
}

function fetchJSON(path, callback, onError) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        try {
          var data = JSON.parse(httpRequest.responseText);
          if (callback) callback(data);
        } catch (error) {
          if (onError) onError();
        }
      } else if (onError) {
        onError();
      }
    }
  };
  httpRequest.open("GET", path);
  httpRequest.send();
}

function buildIndex() {
  indexing = true;
  setStatus("正在载入搜索索引 / Loading search index...");
  var baseURL = wrapper.getAttribute("data-url");
  baseURL = baseURL.replace(/\/?$/, "/");
  fetchJSON(
    baseURL + "index.json",
    function (data) {
      var options = {
        shouldSort: true,
        ignoreLocation: true,
        threshold: 0.0,
        includeMatches: true,
        keys: [
          { name: "title", weight: 0.8 },
          { name: "section", weight: 0.2 },
          { name: "summary", weight: 0.6 },
          { name: "content", weight: 0.4 },
        ],
      };
      fuse = new Fuse(data, options);
      indexed = true;
      indexing = false;
      setStatus("");
      if (queuedTerm) {
        executeQuery(queuedTerm);
      }
    },
    function () {
      indexing = false;
      indexFailed = true;
      hasResults = false;
      output.innerHTML = "";
      setStatus("搜索暂时不可用。请回到文章目录。 / Search is temporarily unavailable. Please use the archive.");
    },
  );
}

function executeQuery(term) {
  queuedTerm = term;
  if (!term.trim()) {
    output.innerHTML = "";
    setStatus("");
    hasResults = false;
    return;
  }

  if (indexFailed) {
    setStatus("搜索暂时不可用。请回到文章目录。 / Search is temporarily unavailable. Please use the archive.");
    return;
  }

  if (!indexed) {
    setStatus("正在载入搜索索引 / Loading search index...");
    return;
  }

  let results = fuse.search(term);
  let resultsHTML = "";

  if (results.length > 0) {
    results.forEach(function (value) {
      var title = value.item.title || "";
      var summary = stripHTML(value.item.summary || "");
      var section = value.item.section || "";
      var date = value.item.date || "";
      var linkconfig = value.item.externalUrl
        ? 'target="_blank" rel="noopener" href="' + escapeHTML(value.item.externalUrl) + '"'
        : 'href="' + escapeHTML(value.item.permalink) + '"';
      resultsHTML =
        resultsHTML +
        `<li class="rx-search-result">
          <a ${linkconfig} tabindex="0">
            <span class="rx-search-result-title">${escapeHTML(title)}</span>
            <span class="rx-search-result-meta">${escapeHTML(section)}${date ? " · " + escapeHTML(date) : ""}</span>
            <span class="rx-search-result-summary">${escapeHTML(summary)}</span>
          </a>
        </li>`;
    });
    hasResults = true;
    setStatus(results.length + " results / " + results.length + " 条结果");
  } else {
    resultsHTML = "";
    hasResults = false;
    setStatus("没有找到相关文章。可以试试 “PVE” 或回到文章目录。 / No matching notes yet. Try “PVE” or return to the archive.");
  }

  output.innerHTML = resultsHTML;
  if (results.length > 0) {
    first = output.firstChild.firstElementChild;
    last = output.lastChild.firstElementChild;
  }
}

function setStatus(message) {
  if (statusEl) statusEl.textContent = message;
}

function stripHTML(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
