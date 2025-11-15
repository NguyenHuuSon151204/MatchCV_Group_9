// Base API URL - dùng "" nếu frontend và backend cùng domain
const API_BASE = "";

// Load HTML partial vào một selector
async function loadPartial(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(url, { cache: "no-cache" });
    const html = await res.text();
    el.innerHTML = html;
}

// Set active item trong sidebar
function setActiveNav(id) {
    document.querySelectorAll(".sidebar-link").forEach(a => {
        if (a.id === id) a.classList.add("active");
        else a.classList.remove("active");
    });
}

// Helpers gọi API
async function apiGet(url) {
    const res = await fetch(API_BASE + url);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

async function apiSend(url, method, body) {
    const res = await fetch(API_BASE + url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null
    });
    if (!res.ok) throw new Error(await res.text());
    if (res.status === 204) return null;
    return res.json();
}
