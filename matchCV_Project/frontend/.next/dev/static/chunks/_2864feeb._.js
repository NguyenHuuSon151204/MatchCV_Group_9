(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/layout/sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-4WY6JWTD.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
const navigation = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
    },
    {
        label: 'My CVs',
        path: '/my-cvs',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    },
    {
        label: 'JD Analyzer',
        path: '/jd-analyzer',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
    },
    {
        label: 'AI Rewrite',
        path: '/ai-rewrite',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"]
    },
    {
        label: 'Export',
        path: '/export',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"]
    },
    {
        label: 'Find Jobs',
        path: '/jobs',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"]
    },
    {
        label: 'Post Job',
        path: '/post-job',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"]
    },
    {
        label: 'Settings',
        path: '/settings',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
    }
];
function Sidebar({ isMobileOpen, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden', isMobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'),
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/layout/sidebar.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('fixed inset-y-0 z-40 w-72 transform border-r border-sidebar-border bg-sidebar/95 backdrop-blur-lg transition-transform lg:static lg:translate-x-0', isMobileOpen ? 'translate-x-0' : '-translate-x-full'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between border-b border-sidebar-border px-6 py-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/60",
                                            children: "MatchCV"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/sidebar.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl font-bold text-sidebar-foreground",
                                            children: "Candidate"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/sidebar.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/layout/sidebar.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary-foreground/80",
                                    children: "AI"
                                }, void 0, false, {
                                    fileName: "[project]/components/layout/sidebar.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/layout/sidebar.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex-1 space-y-1 px-4 py-6",
                            children: navigation.map((item)=>{
                                const Icon = item.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NavLink"], {
                                    to: item.path,
                                    className: ({ isActive })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all', isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-lg shadow-primary/20' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'),
                                    onClick: onClose,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "size-5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/layout/sidebar.tsx",
                                            lineNumber: 78,
                                            columnNumber: 19
                                        }, this),
                                        item.label
                                    ]
                                }, item.path, true, {
                                    fileName: "[project]/components/layout/sidebar.tsx",
                                    lineNumber: 65,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/layout/sidebar.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-sidebar-border px-6 py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-4 text-sm text-sidebar-foreground/80",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: "AI Copilot"
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/sidebar.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-sidebar-foreground/60",
                                        children: "Upload a new CV and let the AI analyze it instantly."
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/sidebar.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "mt-3 w-full rounded-xl bg-primary/20 py-2 text-xs font-semibold text-primary-foreground",
                                        children: "Upload CV"
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/sidebar.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/sidebar.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/layout/sidebar.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/sidebar.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/layout/sidebar.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/topbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Topbar",
    ()=>Topbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/theme-provider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function Topbar({ onToggleSidebar }) {
    _s();
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "flex items-center justify-between border-b border-border bg-card/70 px-4 py-4 backdrop-blur-md lg:px-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "rounded-full border border-border p-2 text-muted-foreground transition hover:bg-muted/30 lg:hidden",
                        onClick: onToggleSidebar,
                        "aria-label": "Toggle sidebar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/topbar.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/topbar.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-full max-w-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/topbar.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Search your CVs, JD, or actions...",
                                className: "w-full rounded-full border border-border bg-background/80 py-2 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/topbar.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/layout/topbar.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/topbar.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-4 flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "rounded-full border border-border p-2 text-muted-foreground transition hover:bg-muted/30",
                        onClick: toggleTheme,
                        "aria-label": "Toggle theme",
                        children: theme === 'dark' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                            className: "size-4"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/topbar.tsx",
                            lineNumber: 39,
                            columnNumber: 33
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                            className: "size-4"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/topbar.tsx",
                            lineNumber: 39,
                            columnNumber: 62
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/topbar.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "rounded-full border border-border p-2 text-muted-foreground transition hover:bg-muted/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                            className: "size-4"
                        }, void 0, false, {
                            fileName: "[project]/components/layout/topbar.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/topbar.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "size-8 rounded-full bg-gradient-to-br from-primary to-primary/60"
                            }, void 0, false, {
                                fileName: "[project]/components/layout/topbar.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold leading-tight",
                                        children: "Anh Dao"
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/topbar.tsx",
                                        lineNumber: 47,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-wide text-muted-foreground",
                                        children: "Candidate"
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/topbar.tsx",
                                        lineNumber: 48,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/topbar.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/layout/topbar.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/topbar.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/topbar.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(Topbar, "Q4eAjrIZ0CuRuhycs6byifK2KBk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Topbar;
var _c;
__turbopack_context__.k.register(_c, "Topbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/layout/main-layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MainLayout",
    ()=>MainLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-4WY6JWTD.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$topbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/topbar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function MainLayout() {
    _s();
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen bg-background text-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                isMobileOpen: sidebarOpen,
                onClose: ()=>setSidebarOpen(false)
            }, void 0, false, {
                fileName: "[project]/components/layout/main-layout.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$topbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Topbar"], {
                        onToggleSidebar: ()=>setSidebarOpen(true)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/main-layout.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto bg-background px-4 py-6 lg:px-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Outlet"], {}, void 0, false, {
                            fileName: "[project]/components/layout/main-layout.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/layout/main-layout.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/layout/main-layout.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/layout/main-layout.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(MainLayout, "5rGDkYpGQ8fHM9RkMWnKOwsxadk=");
_c = MainLayout;
var _c;
__turbopack_context__.k.register(_c, "MainLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/common/activity-list.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActivityList",
    ()=>ActivityList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
;
;
function ActivityList({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: items.map((activity)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3 rounded-2xl border border-border/40 bg-card/60 px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-full bg-primary/20 p-2 text-primary",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                            className: "size-4"
                        }, void 0, false, {
                            fileName: "[project]/components/common/activity-list.tsx",
                            lineNumber: 17,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/common/activity-list.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-card-foreground",
                                children: activity.title
                            }, void 0, false, {
                                fileName: "[project]/components/common/activity-list.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: activity.description
                            }, void 0, false, {
                                fileName: "[project]/components/common/activity-list.tsx",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/common/activity-list.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-auto text-xs text-muted-foreground",
                        children: activity.timestamp
                    }, void 0, false, {
                        fileName: "[project]/components/common/activity-list.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this)
                ]
            }, activity.id, true, {
                fileName: "[project]/components/common/activity-list.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/common/activity-list.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = ActivityList;
var _c;
__turbopack_context__.k.register(_c, "ActivityList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/common/score-circle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScoreCircle",
    ()=>ScoreCircle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function ScoreCircle({ score = 0, size = 56 }) {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const clampedScore = Math.min(Math.max(score, 0), 100);
    const progress = clampedScore / 100 * circumference;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative inline-flex items-center justify-center",
        style: {
            width: size,
            height: size
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                className: "-rotate-90",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        stroke: "var(--color-border)",
                        strokeWidth: "6",
                        fill: "transparent",
                        r: radius,
                        cx: size / 2,
                        cy: size / 2
                    }, void 0, false, {
                        fileName: "[project]/components/common/score-circle.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        stroke: "url(#scoreGradient)",
                        strokeWidth: "6",
                        fill: "transparent",
                        strokeLinecap: "round",
                        r: radius,
                        cx: size / 2,
                        cy: size / 2,
                        strokeDasharray: `${progress} ${circumference}`
                    }, void 0, false, {
                        fileName: "[project]/components/common/score-circle.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                            id: "scoreGradient",
                            x1: "0%",
                            y1: "0%",
                            x2: "100%",
                            y2: "0%",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: "var(--color-primary)"
                                }, void 0, false, {
                                    fileName: "[project]/components/common/score-circle.tsx",
                                    lineNumber: 37,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: "var(--color-chart-3)"
                                }, void 0, false, {
                                    fileName: "[project]/components/common/score-circle.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/common/score-circle.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/common/score-circle.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/common/score-circle.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute text-xs font-semibold text-foreground",
                children: clampedScore
            }, void 0, false, {
                fileName: "[project]/components/common/score-circle.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/common/score-circle.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = ScoreCircle;
var _c;
__turbopack_context__.k.register(_c, "ScoreCircle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-lg border border-border bg-card text-card-foreground shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Card;
Card.displayName = 'Card';
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col space-y-1.5 p-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 23,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = CardHeader;
CardHeader.displayName = 'CardHeader';
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-2xl font-semibold leading-none tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 35,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = CardTitle;
CardTitle.displayName = 'CardTitle';
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm text-muted-foreground', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 50,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = CardDescription;
CardDescription.displayName = 'CardDescription';
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-6 pt-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = CardContent;
CardContent.displayName = 'CardContent';
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center p-6 pt-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 70,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = CardFooter;
CardFooter.displayName = 'CardFooter';
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/services/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 15000
});
// Request interceptor: Add auth token and userId
apiClient.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = window.localStorage.getItem('matchcv-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Add userId to query params if not already present
        const userId = window.localStorage.getItem('matchcv-userId');
        if (userId && !config.params?.userId) {
            config.params = {
                ...config.params,
                userId: parseInt(userId, 10)
            };
        }
    }
    return config;
});
// Response interceptor: Unwrap BaseResponseDto and handle errors
apiClient.interceptors.response.use((response)=>{
    // Backend returns BaseResponseDto<T> with structure: { Success, Message, Data, Errors }
    const data = response.data;
    // Check if response follows BaseResponseDto structure
    if (data && typeof data === 'object' && 'Success' in data && 'Data' in data) {
        if (data.Success) {
            // Return the unwrapped Data
            return {
                ...response,
                data: data.Data
            };
        } else {
            // Return error with message
            const error = new Error(data.Message || 'Request failed');
            return Promise.reject({
                ...error,
                response: {
                    ...response,
                    data: {
                        message: data.Message,
                        errors: data.Errors || []
                    }
                }
            });
        }
    }
    // If not BaseResponseDto structure, return as-is
    return response;
}, (error)=>{
    if (error.response?.status === 401 && ("TURBOPACK compile-time value", "object") !== 'undefined') {
        window.localStorage.removeItem('matchcv-token');
        window.localStorage.removeItem('matchcv-userId');
    }
    // Unwrap error response if it's BaseResponseDto
    if (error.response?.data && typeof error.response.data === 'object' && 'Message' in error.response.data) {
        error.message = error.response.data.Message || error.message;
    }
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = apiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/services/dashboard-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dashboardService",
    ()=>dashboardService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/api-client.ts [app-client] (ecmascript)");
;
const mockMetrics = {
    totalCVs: 12,
    analyzedCVs: 8,
    exportedCVs: 5,
    averageScore: 82,
    activity: [
        {
            id: '1',
            title: 'Uploaded CV',
            description: 'Software Engineer Resume uploaded',
            timestamp: '10 min ago'
        },
        {
            id: '2',
            title: 'Analyzed CV',
            description: 'AI analyzed Product Manager Resume',
            timestamp: '35 min ago'
        },
        {
            id: '3',
            title: 'AI Rewrite',
            description: 'Summary rewritten for Marketing CV',
            timestamp: '1 hr ago'
        },
        {
            id: '4',
            title: 'Exported CV',
            description: 'Data Analyst Resume exported to PDF',
            timestamp: '2 hr ago'
        }
    ]
};
const dashboardService = {
    async getMetrics () {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/candidate/dashboard');
            return response.data;
        } catch (error) {
            console.warn('[dashboardService] fallback to mock metrics', error);
            return mockMetrics;
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/dashboard/dashboard-page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardPage",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$activity$2d$list$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/activity-list.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$score$2d$circle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/score-circle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$dashboard$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/dashboard-service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const metricConfig = [
    {
        key: 'totalCVs',
        label: 'Total CVs',
        accent: 'from-purple-500 to-indigo-500'
    },
    {
        key: 'analyzedCVs',
        label: 'Analyzed CVs',
        accent: 'from-emerald-500 to-cyan-500'
    },
    {
        key: 'averageScore',
        label: 'Average AI Score',
        accent: 'from-amber-500 to-orange-500'
    },
    {
        key: 'exportedCVs',
        label: 'Exported CVs',
        accent: 'from-blue-500 to-sky-500'
    }
];
function DashboardPage() {
    _s();
    const [metrics, setMetrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$dashboard$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashboardService"].getMetrics().then(setMetrics).finally({
                "DashboardPage.useEffect": ()=>setLoading(false)
            }["DashboardPage.useEffect"]);
        }
    }["DashboardPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm uppercase tracking-[0.4em] text-muted-foreground",
                        children: "Overview"
                    }, void 0, false, {
                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-semibold text-card-foreground",
                        children: "Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Manage and analyze your professional resumes using AI."
                    }, void 0, false, {
                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
                children: metricConfig.map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-none bg-card/70 shadow-lg shadow-black/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "pb-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                    children: metric.label
                                }, void 0, false, {
                                    fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                    lineNumber: 40,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                lineNumber: 39,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl font-bold tracking-tight",
                                        children: loading ? '—' : metrics ? metrics[metric.key] : '—'
                                    }, void 0, false, {
                                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                        lineNumber: 43,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `rounded-full bg-gradient-to-br ${metric.accent} p-3 text-white shadow-lg shadow-black/30`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold uppercase",
                                            children: "AI"
                                        }, void 0, false, {
                                            fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                            lineNumber: 49,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this)
                        ]
                    }, metric.key, true, {
                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-none bg-card/80 shadow-xl shadow-primary/5 lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                className: "flex flex-row items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-xl",
                                                children: "AI Insights"
                                            }, void 0, false, {
                                                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                                lineNumber: 60,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                children: "Top strengths extracted from latest analyses."
                                            }, void 0, false, {
                                                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                                lineNumber: 61,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$score$2d$circle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScoreCircle"], {
                                        score: metrics?.averageScore,
                                        size: 96
                                    }, void 0, false, {
                                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 md:grid-cols-3",
                                        children: [
                                            'React',
                                            'System Design',
                                            'Leadership'
                                        ].map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-2xl border border-border/40 bg-muted/20 p-4 text-center text-sm font-semibold text-muted-foreground",
                                                children: skill
                                            }, skill, false, {
                                                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                                lineNumber: 68,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-3xl border border-border/40 bg-background/60 p-4 text-sm text-muted-foreground",
                                        children: "Keep your CVs updated with quantifiable achievements. AI prioritizes clarity, measurable impact, and alignment with the job description keywords."
                                    }, void 0, false, {
                                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-none bg-card/80 shadow-xl shadow-primary/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "text-xl",
                                        children: "Recent Activity"
                                    }, void 0, false, {
                                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        children: "Track how you interact with AI workflows."
                                    }, void 0, false, {
                                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$activity$2d$list$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActivityList"], {
                                    items: metrics?.activity ?? []
                                }, void 0, false, {
                                    fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/dashboard/dashboard-page.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/dashboard/dashboard-page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/dashboard/dashboard-page.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "fBTGJBWRiP5pOKLlkzmUs+VdvMQ=");
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0', {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/button.tsx",
        lineNumber: 43,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = 'Button';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type = "text", ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-2xl border border-input bg-background/80 px-4 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary/40", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
            secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            outline: 'text-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/common/status-badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusBadge",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
'use client';
;
;
const statusMap = {
    draft: {
        label: 'Draft',
        variant: 'secondary',
        classes: 'bg-muted text-muted-foreground'
    },
    uploaded: {
        label: 'Uploaded',
        variant: 'secondary',
        classes: 'bg-blue-500/20 text-blue-200'
    },
    analyzed: {
        label: 'Analyzed',
        variant: 'default',
        classes: 'bg-emerald-500/20 text-emerald-200'
    },
    submitted: {
        label: 'Submitted',
        variant: 'default',
        classes: 'bg-amber-500/20 text-amber-100'
    },
    activing: {
        label: 'Activating',
        variant: 'outline',
        classes: 'border-primary/30 text-primary'
    }
};
function StatusBadge({ status }) {
    const config = statusMap[status];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
        variant: config.variant,
        className: `rounded-full px-3 py-0.5 text-xs font-semibold ${config.classes}`,
        children: config.label
    }, void 0, false, {
        fileName: "[project]/components/common/status-badge.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = StatusBadge;
var _c;
__turbopack_context__.k.register(_c, "StatusBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/common/cv-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CVCard",
    ()=>CVCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$score$2d$circle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/score-circle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/status-badge.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
function CVCard({ cv, onEdit, onAnalyze, onRewrite, onExport, onDelete }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-3xl border border-border/40 bg-card/70 p-4 shadow-lg shadow-black/5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl bg-primary/10 p-3 text-primary",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                            className: "size-5"
                        }, void 0, false, {
                            fileName: "[project]/components/common/cv-card.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/common/cv-card.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-card-foreground",
                                                children: cv.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/common/cv-card.tsx",
                                                lineNumber: 27,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: cv.position
                                            }, void 0, false, {
                                                fileName: "[project]/components/common/cv-card.tsx",
                                                lineNumber: 28,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/common/cv-card.tsx",
                                        lineNumber: 26,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-full border border-border/40 p-2 text-muted-foreground hover:bg-muted/30",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/common/cv-card.tsx",
                                            lineNumber: 31,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/common/cv-card.tsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/common/cv-card.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                        status: cv.status
                                    }, void 0, false, {
                                        fileName: "[project]/components/common/cv-card.tsx",
                                        lineNumber: 35,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$score$2d$circle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScoreCircle"], {
                                        score: cv.score,
                                        size: 48
                                    }, void 0, false, {
                                        fileName: "[project]/components/common/cv-card.tsx",
                                        lineNumber: 36,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/common/cv-card.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/common/cv-card.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/common/cv-card.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid grid-cols-2 gap-2 text-xs font-semibold",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onEdit(cv.id),
                        className: "col-span-2 rounded-2xl border border-blue-500/30 px-3 py-2 text-blue-500 hover:border-blue-500/60",
                        children: "Edit CV"
                    }, void 0, false, {
                        fileName: "[project]/components/common/cv-card.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onAnalyze(cv.id),
                        className: "rounded-2xl border border-border/40 px-3 py-2 text-primary hover:border-primary/60",
                        children: "Analyze"
                    }, void 0, false, {
                        fileName: "[project]/components/common/cv-card.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onRewrite(cv.id),
                        className: "rounded-2xl border border-border/40 px-3 py-2 text-purple-300 hover:border-purple-500/60",
                        children: "Rewrite"
                    }, void 0, false, {
                        fileName: "[project]/components/common/cv-card.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onExport(cv.id, 'pdf'),
                        className: "rounded-2xl border border-border/40 px-3 py-2 text-muted-foreground hover:border-muted-foreground/50",
                        children: "Export"
                    }, void 0, false, {
                        fileName: "[project]/components/common/cv-card.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onDelete(cv.id),
                        className: "rounded-2xl border border-destructive/30 px-3 py-2 text-destructive hover:border-destructive/60",
                        children: "Delete"
                    }, void 0, false, {
                        fileName: "[project]/components/common/cv-card.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/common/cv-card.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/common/cv-card.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = CVCard;
var _c;
__turbopack_context__.k.register(_c, "CVCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/services/cv-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cvService",
    ()=>cvService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/api-client.ts [app-client] (ecmascript)");
;
const mockCVs = [
    {
        id: '1',
        name: 'Software Engineer Resume',
        position: 'Software Engineer',
        description: 'Full-stack development position',
        modifiedAt: new Date().toISOString(),
        status: 'analyzed',
        score: 82,
        evidence: [
            'Strong technical skills',
            'Relevant experience',
            'Excellent project portfolio'
        ]
    },
    {
        id: '2',
        name: 'Marketing Specialist Resume',
        position: 'Marketing Specialist',
        description: 'Digital marketing role',
        modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'submitted',
        score: 75
    },
    {
        id: '3',
        name: 'Data Analyst Resume',
        position: 'Data Analyst',
        description: 'Analytics and insights',
        modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'draft'
    },
    {
        id: '4',
        name: 'Product Manager Resume',
        position: 'Product Manager',
        description: 'Product strategy and execution',
        modifiedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'activing'
    },
    {
        id: '5',
        name: 'UX Designer Resume',
        position: 'UX Designer',
        description: 'User experience design',
        modifiedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'draft'
    }
];
let cvStore = [
    ...mockCVs
];
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
// Map backend DocumentDto to frontend CV
function mapDocumentDtoToCV(dto) {
    // Handle date conversion - backend returns DateTime as ISO string
    let modifiedAt = new Date().toISOString();
    if (dto.UpdatedAt) {
        try {
            const date = new Date(dto.UpdatedAt);
            if (!isNaN(date.getTime())) {
                modifiedAt = date.toISOString();
            }
        } catch  {
        // Keep default if parsing fails
        }
    } else if (dto.modifiedAt) {
        try {
            const date = new Date(dto.modifiedAt);
            if (!isNaN(date.getTime())) {
                modifiedAt = date.toISOString();
            }
        } catch  {
        // Keep default if parsing fails
        }
    }
    return {
        id: dto.Id?.toString() || dto.id?.toString() || '',
        name: dto.OriginalName || dto.name || 'Untitled CV',
        position: dto.DocType || dto.position || '',
        description: dto.FileName || dto.description,
        modifiedAt,
        status: mapBackendStatusToFrontend(dto.Status || dto.status || 'draft'),
        score: dto.TotalScore ?? dto.AiConfidence ?? dto.score,
        fileUrl: dto.FileName ? `/uploads/${dto.FileName}` : undefined
    };
}
// Map backend status to frontend CVStatus (case-insensitive)
function mapBackendStatusToFrontend(status) {
    if (!status) return 'draft';
    const statusLower = status.toLowerCase();
    const statusMap = {
        draft: 'draft',
        uploaded: 'uploaded',
        analyzed: 'analyzed',
        submitted: 'submitted',
        active: 'activing'
    };
    return statusMap[statusLower] || 'draft';
}
async function withFallback(request, fallback) {
    try {
        return await request();
    } catch (error) {
        console.warn('[cvService] falling back to mock data', error);
        return fallback();
    }
}
const cvService = {
    async getCVs () {
        return withFallback(async ()=>{
            // Backend: GET /api/cv/user/{userId}
            const userId = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem('matchcv-userId') : "TURBOPACK unreachable";
            if (!userId) {
                throw new Error('User ID not found');
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/cv/user/${userId}`);
            // Backend returns array of DocumentDto, need to map to CV
            return Array.isArray(response.data) ? response.data.map(mapDocumentDtoToCV) : [];
        }, async ()=>{
            await delay(300);
            return cvStore;
        });
    },
    async getCV (id) {
        return withFallback(async ()=>{
            // Backend: GET /api/cv/{id}?userId={userId}
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/cv/${id}`);
            return mapDocumentDtoToCV(response.data);
        }, async ()=>{
            await delay(200);
            return cvStore.find((cv)=>cv.id === id) || null;
        });
    },
    async createCV (payload) {
        return withFallback(async ()=>{
            // Backend: POST /api/cv/create?userId={userId}
            // Backend expects: { OriginalName, TemplateId? }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/cv/create', {
                OriginalName: payload.name || `${payload.position} Resume`
            });
            const created = mapDocumentDtoToCV(response.data);
            // Update with additional frontend fields
            return {
                ...created,
                position: payload.position,
                description: payload.description
            };
        }, async ()=>{
            await delay(250);
            const newCV = {
                id: Date.now().toString(),
                name: payload.name,
                position: payload.position,
                description: payload.description,
                modifiedAt: new Date().toISOString(),
                status: 'draft'
            };
            cvStore = [
                newCV,
                ...cvStore
            ];
            return newCV;
        });
    },
    async updateCV (payload) {
        return withFallback(async ()=>{
            // Backend: PUT /api/cv/{id}?userId={userId}
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/cv/${payload.id}`, {
                OriginalName: payload.name,
                DocType: 'CV'
            });
            return mapDocumentDtoToCV(response.data);
        }, async ()=>{
            await delay(200);
            cvStore = cvStore.map((cv)=>cv.id === payload.id ? {
                    ...cv,
                    ...payload
                } : cv);
            const updated = cvStore.find((cv)=>cv.id === payload.id);
            if (!updated) {
                throw new Error('CV not found');
            }
            return updated;
        });
    },
    async uploadCV (id, file) {
        return withFallback(async ()=>{
            // Backend: POST /api/cv/upload?userId={userId}&id={id}
            // If id is null or empty, backend will create new CV
            const formData = new FormData();
            formData.append('file', file);
            const params = {};
            if (id) {
                const idNum = parseInt(id, 10);
                if (!isNaN(idNum) && idNum > 0) {
                    params.id = idNum;
                }
            }
            // Don't set Content-Type header - axios will set it automatically with boundary for FormData
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/cv/upload`, formData, {
                params
            });
            // Backend returns DocumentDto wrapped in BaseResponseDto
            const doc = response.data;
            return {
                fileName: doc.FileName || file.name,
                fileSize: doc.FileSize || file.size,
                uploadedAt: doc.UpdatedAt || new Date().toISOString()
            };
        }, async ()=>{
            await delay(600);
            if (id) {
                cvStore = cvStore.map((cv)=>cv.id === id ? {
                        ...cv,
                        status: 'uploaded',
                        modifiedAt: new Date().toISOString()
                    } : cv);
            }
            return {
                fileName: file.name,
                fileSize: file.size,
                uploadedAt: new Date().toISOString()
            };
        });
    },
    async analyzeCV (id) {
        return withFallback(async ()=>{
            // Backend: POST /api/cv/analyze/{id}?userId={userId}
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/cv/analyze/${id}`);
            // Backend returns AnalysisResultDto: { DocumentId, Score, Confidence, Evidence (string), Skills, Experiences, Educations }
            const data = response.data;
            // Handle Evidence - could be string, array, or JSON string
            let evidence = [];
            if (data.Evidence) {
                if (typeof data.Evidence === 'string') {
                    try {
                        // Try parsing as JSON array first
                        const parsed = JSON.parse(data.Evidence);
                        evidence = Array.isArray(parsed) ? parsed : [
                            data.Evidence
                        ];
                    } catch  {
                        // If not JSON, check if it's comma-separated
                        evidence = data.Evidence.includes(',') ? data.Evidence.split(',').map((e)=>e.trim()).filter(Boolean) : [
                            data.Evidence
                        ];
                    }
                } else if (Array.isArray(data.Evidence)) {
                    evidence = data.Evidence;
                }
            } else if (data.EvidenceList && Array.isArray(data.EvidenceList)) {
                evidence = data.EvidenceList;
            }
            return {
                score: Math.round(data.Score || data.TotalScore || 0),
                evidence,
                suggestions: data.Skills?.map((s)=>`${s.Name} (${s.Proficiency})`) || []
            };
        }, async ()=>{
            await delay(1000);
            const score = Math.floor(Math.random() * 25) + 70;
            cvStore = cvStore.map((cv)=>cv.id === id ? {
                    ...cv,
                    status: 'analyzed',
                    score,
                    evidence: [
                        'Strong quantifiable impact',
                        'Clear growth trajectory',
                        'Relevant keyword density'
                    ],
                    modifiedAt: new Date().toISOString()
                } : cv);
            return {
                score,
                evidence: [
                    'Strong quantifiable impact',
                    'Clear growth trajectory',
                    'Relevant keyword density'
                ],
                suggestions: [
                    'Highlight leadership achievements',
                    'Refine summary for role-specific keywords',
                    'Add metrics for recent projects'
                ]
            };
        });
    },
    async deleteCV (id) {
        return withFallback(async ()=>{
            // Backend: DELETE /api/cv/{id}?userId={userId}
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/cv/${id}`);
        }, async ()=>{
            await delay(150);
            cvStore = cvStore.filter((cv)=>cv.id !== id);
        });
    },
    async exportCV (id, format) {
        return withFallback(async ()=>{
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/cv/${id}/export`, {
                params: {
                    format
                },
                responseType: 'blob'
            });
            return response.data;
        }, async ()=>{
            await delay(200);
            const cv = cvStore.find((item)=>item.id === id);
            if (!cv) throw new Error('CV not found');
            const content = `CV: ${cv.name}\nPosition: ${cv.position}\nStatus: ${cv.status}\nScore: ${cv.score ?? 'N/A'}\nGenerated: ${new Date().toISOString()}`;
            return new Blob([
                content
            ], {
                type: 'text/plain'
            });
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useCV.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCV",
    ()=>useCV
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cv$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/cv-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/toast-context.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useCV() {
    _s();
    const [cvs, setCvs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToastContext"])();
    const fetchCVs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCV.useCallback[fetchCVs]": async ()=>{
            setLoading(true);
            setError(null);
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cv$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cvService"].getCVs();
                setCvs(data);
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Unable to load CVs';
                setError(message);
                toast.error('Failed to load CVs', message);
            } finally{
                setLoading(false);
            }
        }
    }["useCV.useCallback[fetchCVs]"], [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCV.useEffect": ()=>{
            fetchCVs();
        }
    }["useCV.useEffect"], [
        fetchCVs
    ]);
    const createCV = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCV.useCallback[createCV]": async (payload)=>{
            try {
                const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cv$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cvService"].createCV(payload);
                toast.success('CV created successfully', `"${payload.name}" has been created`);
                // Refresh to get latest data from backend (includes the new CV)
                await fetchCVs();
                return created;
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to create CV';
                toast.error('Failed to create CV', message);
                throw err;
            }
        }
    }["useCV.useCallback[createCV]"], [
        toast,
        fetchCVs
    ]);
    const deleteCV = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCV.useCallback[deleteCV]": async (id)=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cv$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cvService"].deleteCV(id);
                setCvs({
                    "useCV.useCallback[deleteCV]": (prev)=>prev.filter({
                            "useCV.useCallback[deleteCV]": (cv)=>cv.id !== id
                        }["useCV.useCallback[deleteCV]"])
                }["useCV.useCallback[deleteCV]"]);
                toast.success('CV deleted', 'The CV has been removed');
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to delete CV';
                toast.error('Failed to delete CV', message);
                throw err;
            }
        }
    }["useCV.useCallback[deleteCV]"], [
        toast
    ]);
    const analyzeCV = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCV.useCallback[analyzeCV]": async (id)=>{
            try {
                const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cv$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cvService"].analyzeCV(id);
                setCvs({
                    "useCV.useCallback[analyzeCV]": (prev)=>prev.map({
                            "useCV.useCallback[analyzeCV]": (cv)=>cv.id === id ? {
                                    ...cv,
                                    status: 'analyzed',
                                    score: result.score
                                } : cv
                        }["useCV.useCallback[analyzeCV]"])
                }["useCV.useCallback[analyzeCV]"]);
                toast.success('CV analyzed', `Score: ${result.score}/100`);
                return result;
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to analyze CV';
                toast.error('Analysis failed', message);
                throw err;
            }
        }
    }["useCV.useCallback[analyzeCV]"], [
        toast
    ]);
    const exportCV = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCV.useCallback[exportCV]": async (id, format)=>{
            try {
                const blob = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cv$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cvService"].exportCV(id, format);
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `cv-${id}.${format === 'json' ? 'json' : format}`;
                link.click();
                URL.revokeObjectURL(url);
                toast.success('CV exported', `Downloaded as ${format.toUpperCase()}`);
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to export CV';
                toast.error('Export failed', message);
                throw err;
            }
        }
    }["useCV.useCallback[exportCV]"], [
        toast
    ]);
    return {
        cvs,
        loading,
        error,
        refresh: fetchCVs,
        createCV,
        deleteCV,
        analyzeCV,
        exportCV,
        setCvs
    };
}
_s(useCV, "BLslYpBdcH61GBHArxJqMy1r/ks=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToastContext"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/common/modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
'use client';
;
;
;
function Modal({ title, description, open, onClose, children, footer, size = 'md' }) {
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `w-full rounded-3xl bg-card/95 p-6 shadow-2xl backdrop-blur-2xl ${size === 'lg' ? 'max-w-3xl' : 'max-w-xl'}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 flex items-start justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold text-card-foreground",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/components/common/modal.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/components/common/modal.tsx",
                                    lineNumber: 37,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/common/modal.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "rounded-full border border-border p-1 text-muted-foreground transition hover:bg-muted/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "size-4"
                            }, void 0, false, {
                                fileName: "[project]/components/common/modal.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/common/modal.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/common/modal.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/common/modal.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex justify-end gap-3",
                    children: footer
                }, void 0, false, {
                    fileName: "[project]/components/common/modal.tsx",
                    lineNumber: 47,
                    columnNumber: 20
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/common/modal.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/common/modal.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this), document.body);
}
_c = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/textarea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Textarea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/textarea.tsx",
        lineNumber: 10,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Textarea;
Textarea.displayName = 'Textarea';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Textarea$React.forwardRef");
__turbopack_context__.k.register(_c1, "Textarea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/my-cvs/create-cv-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CreateCvModal",
    ()=>CreateCvModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function CreateCvModal({ open, onClose, onSubmit }) {
    _s();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        position: '',
        description: ''
    });
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleSubmit = async ()=>{
        if (!form.name || !form.position) return;
        setSubmitting(true);
        try {
            await onSubmit(form);
            setForm({
                name: '',
                position: '',
                description: ''
            });
            onClose();
        } catch (err) {
        // Error is handled by useCV hook
        } finally{
            setSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        open: open,
        onClose: onClose,
        title: "Create New CV",
        description: "Add a new AI-ready CV with title, role, and description.",
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    onClick: onClose,
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                    lineNumber: 44,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: handleSubmit,
                    disabled: submitting,
                    children: submitting ? 'Creating...' : 'Create CV'
                }, void 0, false, {
                    fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-sm font-semibold text-card-foreground",
                            children: "CV Title"
                        }, void 0, false, {
                            fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            value: form.name,
                            onChange: (e)=>setForm((prev)=>({
                                        ...prev,
                                        name: e.target.value
                                    })),
                            placeholder: "e.g. Senior Frontend Engineer Resume"
                        }, void 0, false, {
                            fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-sm font-semibold text-card-foreground",
                            children: "Position"
                        }, void 0, false, {
                            fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            value: form.position,
                            onChange: (e)=>setForm((prev)=>({
                                        ...prev,
                                        position: e.target.value
                                    })),
                            placeholder: "e.g. Frontend Engineer"
                        }, void 0, false, {
                            fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-sm font-semibold text-card-foreground",
                            children: "Description"
                        }, void 0, false, {
                            fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                            className: "min-h-[120px] rounded-2xl",
                            value: form.description,
                            onChange: (e)=>setForm((prev)=>({
                                        ...prev,
                                        description: e.target.value
                                    })),
                            placeholder: "Describe key skills, focus areas, or achievements."
                        }, void 0, false, {
                            fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/features/my-cvs/create-cv-modal.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(CreateCvModal, "A1SGSKBD+ayHc74B5SeCnIvUhH4=");
_c = CreateCvModal;
var _c;
__turbopack_context__.k.register(_c, "CreateCvModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useUpload.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUpload",
    ()=>useUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cv$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/cv-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/toast-context.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useUpload(onUploadSuccess) {
    _s();
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastUpload, setLastUpload] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToastContext"])();
    const upload = async (cvId, file)=>{
        setUploading(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$cv$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cvService"].uploadCV(cvId, file);
            setLastUpload(result);
            toast.success('File uploaded successfully', `${file.name} has been uploaded`);
            // Call refresh callback if provided
            if (onUploadSuccess) {
                onUploadSuccess();
            }
            return result;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to upload file';
            toast.error('Upload failed', message);
            throw err;
        } finally{
            setUploading(false);
        }
    };
    return {
        uploading,
        lastUpload,
        upload
    };
}
_s(useUpload, "CZSOP+MjV2FoUrfmlDV3CmNHY0k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToastContext"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/my-cvs/upload-cv-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UploadCvModal",
    ()=>UploadCvModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUpload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useUpload.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function UploadCvModal({ open, onClose, cvId, onUploadSuccess }) {
    _s();
    const { upload, uploading, lastUpload } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUpload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpload"])(onUploadSuccess);
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleUpload = async ()=>{
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }
        setError(null);
        try {
            // cvId can be null - backend will create new CV if id is not provided
            await upload(cvId, file);
            setFile(null);
            onClose();
        } catch (err) {
            // Error is handled by useUpload hook
            setError(err instanceof Error ? err.message : 'Upload failed');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        open: open,
        onClose: onClose,
        title: "Upload CV",
        description: "Attach a PDF or DOCX file to power richer AI analysis.",
        footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    onClick: onClose,
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
                    lineNumber: 43,
                    columnNumber: 11
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: handleUpload,
                    disabled: uploading || !file,
                    children: uploading ? 'Uploading...' : 'Upload'
                }, void 0, false, {
                    fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, void 0)
            ]
        }, void 0, true),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "block cursor-pointer rounded-2xl border border-dashed border-border/60 px-4 py-6 text-center text-sm text-muted-foreground hover:border-primary/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "file",
                            accept: ".pdf,.doc,.docx",
                            className: "hidden",
                            onChange: (event)=>setFile(event.target.files?.[0] ?? null)
                        }, void 0, false, {
                            fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-card-foreground",
                                    children: file.name
                                }, void 0, false, {
                                    fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        (file.size / 1024).toFixed(1),
                                        " KB"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold text-card-foreground",
                                    children: "Click to select a file"
                                }, void 0, false, {
                                    fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "PDF, DOCX up to 10MB"
                                }, void 0, false, {
                                    fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-destructive",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
                    lineNumber: 72,
                    columnNumber: 19
                }, this),
                lastUpload && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-border/40 bg-muted/20 p-3 text-xs text-muted-foreground",
                    children: [
                        "Last upload: ",
                        lastUpload.fileName,
                        " • ",
                        (lastUpload.fileSize / 1024).toFixed(1),
                        " KB"
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
                    lineNumber: 74,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
            lineNumber: 52,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/features/my-cvs/upload-cv-modal.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(UploadCvModal, "Pwg4dWUyAxieCI8D4rm8XuA065A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUpload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpload"]
    ];
});
_c = UploadCvModal;
var _c;
__turbopack_context__.k.register(_c, "UploadCvModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/my-cvs/my-cvs-page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MyCVsPage",
    ()=>MyCVsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-4WY6JWTD.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$score$2d$circle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/score-circle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/status-badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$cv$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/common/cv-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useCV.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$my$2d$cvs$2f$create$2d$cv$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/my-cvs/create-cv-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$my$2d$cvs$2f$upload$2d$cv$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/my-cvs/upload-cv-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function MyCVsPage() {
    _s();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const { cvs, loading, createCV, analyzeCV, deleteCV, exportCV, refresh } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCV"])();
    const [createOpen, setCreateOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadOpen, setUploadOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedCvId, setSelectedCvId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busyId, setBusyId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const defaultUploadId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MyCVsPage.useMemo[defaultUploadId]": ()=>selectedCvId ?? cvs[0]?.id ?? null
    }["MyCVsPage.useMemo[defaultUploadId]"], [
        selectedCvId,
        cvs
    ]);
    // Filter CVs based on search query
    const filteredCVs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MyCVsPage.useMemo[filteredCVs]": ()=>{
            if (!searchQuery.trim()) {
                return cvs;
            }
            const query = searchQuery.toLowerCase().trim();
            return cvs.filter({
                "MyCVsPage.useMemo[filteredCVs]": (cv)=>cv.name.toLowerCase().includes(query) || cv.position.toLowerCase().includes(query) || cv.description && cv.description.toLowerCase().includes(query)
            }["MyCVsPage.useMemo[filteredCVs]"]);
        }
    }["MyCVsPage.useMemo[filteredCVs]"], [
        cvs,
        searchQuery
    ]);
    const handleAnalyze = async (id)=>{
        setBusyId(id);
        await analyzeCV(id);
        setBusyId(null);
    };
    const handleExport = async (id, format)=>{
        await exportCV(id, format);
    };
    const handleDelete = async (id)=>{
        setBusyId(id);
        await deleteCV(id);
        setBusyId(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm uppercase tracking-[0.4em] text-muted-foreground",
                                children: "Workspace"
                            }, void 0, false, {
                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-semibold text-card-foreground",
                                children: "My CVs"
                            }, void 0, false, {
                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-muted-foreground",
                                children: "Manage, analyze, rewrite, and export every CV in one place."
                            }, void 0, false, {
                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                className: "gap-2 rounded-full border-border/60",
                                onClick: ()=>{
                                    setUploadOpen(true);
                                    setSelectedCvId(cvs[0]?.id ?? null);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        className: "size-4"
                                    }, void 0, false, {
                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this),
                                    "Upload CV"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                className: "gap-2 rounded-full border-border/60",
                                onClick: ()=>navigate('/cv-builder'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "size-4"
                                    }, void 0, false, {
                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, this),
                                    "CV Builder"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                className: "gap-2 rounded-full",
                                onClick: ()=>setCreateOpen(true),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "size-4"
                                    }, void 0, false, {
                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this),
                                    "Create New CV"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-3xl border border-border/40 bg-card/80 p-4 shadow-2xl shadow-black/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                type: "text",
                                placeholder: "Search CVs by name, position, or description...",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                className: "w-full pl-12 pr-4"
                            }, void 0, false, {
                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-muted-foreground",
                        children: [
                            "Found ",
                            filteredCVs.length,
                            " CV",
                            filteredCVs.length !== 1 ? 's' : '',
                            ' matching "',
                            searchQuery,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-3xl border border-border/40 bg-card/80 p-4 shadow-2xl shadow-black/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden w-full overflow-hidden rounded-2xl border border-border/30 md:block",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "min-w-full divide-y divide-border/40 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-muted/30 text-xs uppercase tracking-wide text-muted-foreground",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-4 text-left",
                                                children: "CV Name"
                                            }, void 0, false, {
                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                lineNumber: 116,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-4 text-left",
                                                children: "Last Modified"
                                            }, void 0, false, {
                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                lineNumber: 117,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-4 text-left",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-4 text-left",
                                                children: "AI Score"
                                            }, void 0, false, {
                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-6 py-4 text-left",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-border/30",
                                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 5,
                                            className: "px-6 py-8 text-center text-muted-foreground",
                                            children: "Loading CVs..."
                                        }, void 0, false, {
                                            fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                            lineNumber: 126,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this) : filteredCVs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 5,
                                            className: "px-6 py-8 text-center text-muted-foreground",
                                            children: searchQuery ? 'No CVs found matching your search.' : 'No CVs found. Create your first CV!'
                                        }, void 0, false, {
                                            fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                            lineNumber: 132,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this) : filteredCVs.map((cv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "bg-background/30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-card-foreground",
                                                            children: cv.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                            lineNumber: 140,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: cv.position
                                                        }, void 0, false, {
                                                            fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4 text-muted-foreground",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(cv.modifiedAt), {
                                                        addSuffix: true
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$status$2d$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                                        status: cv.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$score$2d$circle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScoreCircle"], {
                                                        score: cv.score
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                        lineNumber: 150,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-6 py-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                className: "rounded-full bg-blue-500/20 text-blue-600",
                                                                variant: "ghost",
                                                                onClick: ()=>navigate(`/cv-builder?id=${cv.id}`),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                        className: "mr-1 size-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                        lineNumber: 160,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Edit"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                lineNumber: 154,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                className: "rounded-full bg-primary/20 text-primary",
                                                                variant: "secondary",
                                                                onClick: ()=>handleAnalyze(cv.id),
                                                                disabled: busyId === cv.id,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                        className: "mr-1 size-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                        lineNumber: 170,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    busyId === cv.id ? 'Analyzing...' : 'Analyze'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                lineNumber: 163,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                className: "rounded-full bg-purple-500/20 text-purple-100",
                                                                variant: "ghost",
                                                                onClick: ()=>navigate('/ai-rewrite', {
                                                                        state: {
                                                                            cvId: cv.id
                                                                        }
                                                                    }),
                                                                children: "Rewrite"
                                                            }, void 0, false, {
                                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                lineNumber: 173,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                className: "rounded-full bg-muted/40 text-muted-foreground",
                                                                variant: "ghost",
                                                                onClick: ()=>handleExport(cv.id, 'pdf'),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                        className: "mr-1 size-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                        lineNumber: 187,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Export"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                lineNumber: 181,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                className: "rounded-full bg-muted/30 text-muted-foreground",
                                                                variant: "ghost",
                                                                onClick: ()=>{
                                                                    setSelectedCvId(cv.id);
                                                                    setUploadOpen(true);
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                        className: "mr-1 size-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                        lineNumber: 199,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Upload"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                variant: "ghost",
                                                                className: "rounded-full text-destructive",
                                                                onClick: ()=>handleDelete(cv.id),
                                                                disabled: busyId === cv.id,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                        className: "mr-1 size-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                        lineNumber: 209,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Delete"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                                lineNumber: 202,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, cv.id, true, {
                                            fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                            lineNumber: 138,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid gap-4 md:hidden",
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-8 text-center text-muted-foreground",
                            children: "Loading CVs..."
                        }, void 0, false, {
                            fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                            lineNumber: 223,
                            columnNumber: 13
                        }, this) : filteredCVs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-8 text-center text-muted-foreground",
                            children: searchQuery ? 'No CVs found matching your search.' : 'No CVs found. Create your first CV!'
                        }, void 0, false, {
                            fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, this) : filteredCVs.map((cv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$common$2f$cv$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CVCard"], {
                                cv: cv,
                                onEdit: (id)=>navigate(`/cv-builder?id=${id}`),
                                onAnalyze: handleAnalyze,
                                onRewrite: (id)=>navigate('/ai-rewrite', {
                                        state: {
                                            cvId: id
                                        }
                                    }),
                                onExport: (id, format)=>handleExport(id, format),
                                onDelete: handleDelete
                            }, cv.id, false, {
                                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                                lineNumber: 230,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$my$2d$cvs$2f$create$2d$cv$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CreateCvModal"], {
                open: createOpen,
                onClose: ()=>setCreateOpen(false),
                onSubmit: async (payload)=>{
                    try {
                        await createCV(payload);
                    // Refresh CVs list after successful creation
                    // This is handled by useCV hook's fetchCVs in createCV
                    } catch (err) {
                    // Error is handled by useCV hook
                    }
                }
            }, void 0, false, {
                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$my$2d$cvs$2f$upload$2d$cv$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UploadCvModal"], {
                open: uploadOpen,
                onClose: ()=>{
                    setUploadOpen(false);
                    setSelectedCvId(null);
                },
                cvId: defaultUploadId,
                onUploadSuccess: refresh
            }, void 0, false, {
                fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/my-cvs/my-cvs-page.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(MyCVsPage, "Eq+XLUwHK7wW8+hSUGOwl2ikovI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCV"]
    ];
});
_c = MyCVsPage;
var _c;
__turbopack_context__.k.register(_c, "MyCVsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/services/ai-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aiService",
    ()=>aiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/api-client.ts [app-client] (ecmascript)");
;
const mockJDAnalysis = {
    skills: [
        'React',
        'Node.js',
        'System Design',
        'Team leadership'
    ],
    priorities: [
        '5+ years experience',
        'SaaS delivery',
        'Cloud-native',
        'Mentorship'
    ],
    suggestions: [
        'Emphasize cloud architecture achievements.',
        'Highlight measurable impact for each role.',
        'Add certifications relevant to React or AWS.'
    ]
};
const mockRewrite = {
    output: 'Led multi-disciplinary teams to launch AI-powered resume intelligence, improving recruiter throughput by 32% and elevating candidate match quality across 120+ roles.',
    highlights: [
        'Quantified impact (32% recruiter throughput)',
        'Leadership and AI-product positioning',
        'Clear scope and scale (120+ roles)'
    ]
};
const aiService = {
    async analyzeJD (description) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/ai/analyze-jd', {
                description
            });
            return response.data;
        } catch (error) {
            console.warn('[aiService.analyzeJD] falling back to mock data', error);
            return mockJDAnalysis;
        }
    },
    async rewriteSection (payload) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/ai/rewrite', payload);
            return response.data;
        } catch (error) {
            console.warn('[aiService.rewriteSection] fallback', error);
            return mockRewrite;
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useAnalyze.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnalyze",
    ()=>useAnalyze
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$ai$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/ai-service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useAnalyze() {
    _s();
    const [jdAnalysis, setJdAnalysis] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [analysisLoading, setAnalysisLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rewriteLoading, setRewriteLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rewriteResult, setRewriteResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const analyzeJD = async (description)=>{
        setAnalysisLoading(true);
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$ai$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiService"].analyzeJD(description);
            setJdAnalysis(data);
            return data;
        } finally{
            setAnalysisLoading(false);
        }
    };
    const rewriteSection = async (payload)=>{
        setRewriteLoading(true);
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$ai$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiService"].rewriteSection(payload);
            setRewriteResult(data);
            return data;
        } finally{
            setRewriteLoading(false);
        }
    };
    return {
        jdAnalysis,
        analysisLoading,
        rewriteLoading,
        rewriteResult,
        analyzeJD,
        rewriteSection
    };
}
_s(useAnalyze, "b/9hTnUiDUqjuQuckhqiCD6KExI=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/jd-analyzer/jd-analyzer-page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JDAnalyzerPage",
    ()=>JDAnalyzerPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAnalyze$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAnalyze.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function JDAnalyzerPage() {
    _s();
    const [jobDescription, setJobDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { analyzeJD, jdAnalysis, analysisLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAnalyze$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalyze"])();
    const handleAnalyze = async ()=>{
        if (!jobDescription.trim()) return;
        await analyzeJD(jobDescription);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm uppercase tracking-[0.4em] text-muted-foreground",
                        children: "AI Copilot"
                    }, void 0, false, {
                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-semibold text-card-foreground",
                        children: "JD Analyzer"
                    }, void 0, false, {
                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Paste the job description to extract skills, priorities, and match tips."
                    }, void 0, false, {
                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-none bg-card/80 shadow-lg shadow-black/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg",
                            children: "Job Description"
                        }, void 0, false, {
                            fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                value: jobDescription,
                                onChange: (e)=>setJobDescription(e.target.value),
                                placeholder: "Paste the job description here...",
                                className: "min-h-[220px] rounded-3xl"
                            }, void 0, false, {
                                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                className: "w-full gap-2 rounded-full",
                                onClick: handleAnalyze,
                                disabled: analysisLoading,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "size-4"
                                    }, void 0, false, {
                                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this),
                                    analysisLoading ? 'Analyzing...' : 'Analyze JD'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            jdAnalysis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-none bg-card/80 shadow-xl shadow-primary/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-base",
                                    children: "Skills"
                                }, void 0, false, {
                                    fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-3",
                                children: jdAnalysis.skills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-border/40 bg-muted/20 px-4 py-2 text-sm",
                                        children: skill
                                    }, skill, false, {
                                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-none bg-card/80 shadow-xl shadow-primary/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-base",
                                    children: "Priority List"
                                }, void 0, false, {
                                    fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-3",
                                children: jdAnalysis.priorities.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 rounded-2xl border border-border/40 px-4 py-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "size-6 rounded-full bg-primary/20 text-center text-xs font-semibold text-primary",
                                                children: index + 1
                                            }, void 0, false, {
                                                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                                lineNumber: 66,
                                                columnNumber: 19
                                            }, this),
                                            item
                                        ]
                                    }, item, true, {
                                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-none bg-card/80 shadow-xl shadow-primary/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-base",
                                    children: "Match Suggestions"
                                }, void 0, false, {
                                    fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-3",
                                children: jdAnalysis.suggestions.map((suggestion)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl border border-border/40 bg-background/40 px-4 py-2 text-sm text-muted-foreground",
                                        children: suggestion
                                    }, suggestion, false, {
                                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                        lineNumber: 80,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/jd-analyzer/jd-analyzer-page.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(JDAnalyzerPage, "dnIaXnSRF7k5PVixogJxWcOKaH8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAnalyze$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalyze"]
    ];
});
_c = JDAnalyzerPage;
var _c;
__turbopack_context__.k.register(_c, "JDAnalyzerPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/ai-rewrite/ai-rewrite-page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AIRewritePage",
    ()=>AIRewritePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-4WY6JWTD.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useCV.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAnalyze$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useAnalyze.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
const sections = [
    {
        label: 'Summary',
        value: 'summary',
        helper: 'High-level intro paragraph'
    },
    {
        label: 'Experience',
        value: 'experience',
        helper: 'Most recent role or project'
    },
    {
        label: 'Skills',
        value: 'skills',
        helper: 'Technical or soft skills focus'
    }
];
function AIRewritePage() {
    _s();
    const location = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    const state = location.state ?? null;
    const { cvs } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCV"])();
    const [selectedCV, setSelectedCV] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [section, setSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('summary');
    const [instructions, setInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const { rewriteResult, rewriteSection, rewriteLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAnalyze$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalyze"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AIRewritePage.useEffect": ()=>{
            if (state?.cvId) {
                setSelectedCV(state.cvId);
            }
        }
    }["AIRewritePage.useEffect"], [
        state
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AIRewritePage.useEffect": ()=>{
            if (!selectedCV && cvs.length > 0) {
                setSelectedCV(cvs[0].id);
            }
        }
    }["AIRewritePage.useEffect"], [
        cvs,
        selectedCV
    ]);
    const selectedCvMeta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AIRewritePage.useMemo[selectedCvMeta]": ()=>cvs.find({
                "AIRewritePage.useMemo[selectedCvMeta]": (cv)=>cv.id === selectedCV
            }["AIRewritePage.useMemo[selectedCvMeta]"])
    }["AIRewritePage.useMemo[selectedCvMeta]"], [
        cvs,
        selectedCV
    ]);
    const handleRewrite = async ()=>{
        if (!selectedCV) return;
        await rewriteSection({
            cvId: selectedCV,
            section,
            instructions
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm uppercase tracking-[0.4em] text-muted-foreground",
                        children: "AI Rewrite"
                    }, void 0, false, {
                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-semibold text-card-foreground",
                        children: "Rewrite Assistant"
                    }, void 0, false, {
                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Select a CV, pick a section, and let AI craft a sharper message."
                    }, void 0, false, {
                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-none bg-card/80 shadow-lg shadow-black/5 lg:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-lg",
                                    children: "Rewrite Inputs"
                                }, void 0, false, {
                                    fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-4 md:grid-cols-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm font-semibold text-card-foreground",
                                                        children: "Select CV"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedCV,
                                                        onChange: (e)=>setSelectedCV(e.target.value),
                                                        className: "h-11 w-full rounded-2xl border border-border bg-background/80 px-4 text-sm",
                                                        children: cvs.map((cv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: cv.id,
                                                                children: cv.name
                                                            }, cv.id, false, {
                                                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                                lineNumber: 78,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                        lineNumber: 72,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                lineNumber: 70,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-sm font-semibold text-card-foreground",
                                                        children: "Section"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                        lineNumber: 85,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: section,
                                                        onChange: (e)=>setSection(e.target.value),
                                                        className: "h-11 w-full rounded-2xl border border-border bg-background/80 px-4 text-sm",
                                                        children: sections.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: item.value,
                                                                children: item.label
                                                            }, item.value, false, {
                                                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                                lineNumber: 92,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                lineNumber: 84,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                        value: instructions,
                                        onChange: (e)=>setInstructions(e.target.value),
                                        placeholder: "Add context, achievements to highlight, preferred tone...",
                                        className: "min-h-[160px] rounded-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "w-full gap-2 rounded-full",
                                        onClick: handleRewrite,
                                        disabled: rewriteLoading,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "size-4"
                                            }, void 0, false, {
                                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, this),
                                            rewriteLoading ? 'Rewriting...' : 'Rewrite Section'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-none bg-card/80 shadow-lg shadow-black/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-lg",
                                    children: "Rewrite Result"
                                }, void 0, false, {
                                    fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4 text-sm",
                                children: [
                                    rewriteResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-3xl border border-border/40 bg-background/50 p-4 text-card-foreground",
                                                children: rewriteResult.output
                                            }, void 0, false, {
                                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs uppercase tracking-wider text-muted-foreground",
                                                        children: "AI Highlights"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 19
                                                    }, this),
                                                    rewriteResult.highlights.map((highlight)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-2xl border border-border/40 bg-muted/20 px-3 py-2 text-xs",
                                                            children: highlight
                                                        }, highlight, false, {
                                                            fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                            lineNumber: 124,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                lineNumber: 121,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: "Run a rewrite to preview AI suggestions."
                                    }, void 0, false, {
                                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this),
                                    selectedCvMeta && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-3xl border border-border/30 bg-background/30 p-4 text-xs text-muted-foreground",
                                        children: [
                                            "Working on ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-card-foreground",
                                                children: selectedCvMeta.name
                                            }, void 0, false, {
                                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                                lineNumber: 135,
                                                columnNumber: 28
                                            }, this),
                                            " —",
                                            ' ',
                                            selectedCvMeta.position
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/ai-rewrite/ai-rewrite-page.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(AIRewritePage, "fsLJmUMvruUsQERFRsjwqap2z5g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCV"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAnalyze$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalyze"]
    ];
});
_c = AIRewritePage;
var _c;
__turbopack_context__.k.register(_c, "AIRewritePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/export/export-page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExportPage",
    ()=>ExportPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useCV.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const formats = [
    {
        label: 'PDF',
        value: 'pdf'
    },
    {
        label: 'DOCX',
        value: 'docx'
    },
    {
        label: 'JSON',
        value: 'json'
    }
];
function ExportPage() {
    _s();
    const { cvs, exportCV } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCV"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm uppercase tracking-[0.4em] text-muted-foreground",
                        children: "Delivery"
                    }, void 0, false, {
                        fileName: "[project]/features/export/export-page.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-semibold text-card-foreground",
                        children: "Export CVs"
                    }, void 0, false, {
                        fileName: "[project]/features/export/export-page.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Choose any CV and export to PDF, DOCX, or JSON for automation."
                    }, void 0, false, {
                        fileName: "[project]/features/export/export-page.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/export/export-page.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "border-none bg-card/80 shadow-xl shadow-black/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-lg",
                            children: "Available CVs"
                        }, void 0, false, {
                            fileName: "[project]/features/export/export-page.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/export/export-page.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "space-y-3",
                        children: cvs.map((cv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-3 rounded-2xl border border-border/40 bg-background/30 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-card-foreground",
                                                children: cv.name
                                            }, void 0, false, {
                                                fileName: "[project]/features/export/export-page.tsx",
                                                lineNumber: 36,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground",
                                                children: cv.position
                                            }, void 0, false, {
                                                fileName: "[project]/features/export/export-page.tsx",
                                                lineNumber: 37,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/export/export-page.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    formats.map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "secondary",
                                            className: "rounded-full border-border/40 bg-muted/40 text-muted-foreground",
                                            onClick: ()=>exportCV(cv.id, format.value),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "mr-1 size-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/export/export-page.tsx",
                                                    lineNumber: 47,
                                                    columnNumber: 19
                                                }, this),
                                                format.label
                                            ]
                                        }, format.value, true, {
                                            fileName: "[project]/features/export/export-page.tsx",
                                            lineNumber: 40,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, cv.id, true, {
                                fileName: "[project]/features/export/export-page.tsx",
                                lineNumber: 31,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/features/export/export-page.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/export/export-page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/export/export-page.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(ExportPage, "5NCccr02YOXUfDrF1EO8acvL8sc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCV$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCV"]
    ];
});
_c = ExportPage;
var _c;
__turbopack_context__.k.register(_c, "ExportPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/settings/settings-page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsPage",
    ()=>SettingsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/providers/theme-provider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const languages = [
    'English',
    'Vietnamese',
    'Japanese'
];
function SettingsPage() {
    _s();
    const { theme, toggleTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        fullName: 'Nguyễn Anh',
        email: 'anh.nguyen@example.com',
        headline: 'Senior Frontend Engineer',
        bio: ''
    });
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(languages[0]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm uppercase tracking-[0.4em] text-muted-foreground",
                        children: "Profile"
                    }, void 0, false, {
                        fileName: "[project]/features/settings/settings-page.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-semibold text-card-foreground",
                        children: "Settings"
                    }, void 0, false, {
                        fileName: "[project]/features/settings/settings-page.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Update personal info, security, theme, and localization."
                    }, void 0, false, {
                        fileName: "[project]/features/settings/settings-page.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/settings/settings-page.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "border-none bg-card/80 shadow-lg shadow-black/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    className: "text-lg",
                                    children: "Profile"
                                }, void 0, false, {
                                    fileName: "[project]/features/settings/settings-page.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/settings/settings-page.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "size-16 rounded-full bg-gradient-to-br from-primary to-primary/50"
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 37,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "rounded-full border-border/60",
                                                children: "Upload Avatar"
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 38,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/settings/settings-page.tsx",
                                        lineNumber: 36,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-semibold text-card-foreground",
                                                children: "Full name"
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 43,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: profile.fullName,
                                                onChange: (e)=>setProfile((prev)=>({
                                                            ...prev,
                                                            fullName: e.target.value
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 44,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/settings/settings-page.tsx",
                                        lineNumber: 42,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-semibold text-card-foreground",
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 47,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: profile.email,
                                                onChange: (e)=>setProfile((prev)=>({
                                                            ...prev,
                                                            email: e.target.value
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 48,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/settings/settings-page.tsx",
                                        lineNumber: 46,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-semibold text-card-foreground",
                                                children: "Headline"
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 51,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                value: profile.headline,
                                                onChange: (e)=>setProfile((prev)=>({
                                                            ...prev,
                                                            headline: e.target.value
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 52,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/settings/settings-page.tsx",
                                        lineNumber: 50,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-semibold text-card-foreground",
                                                children: "Bio"
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 55,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                                className: "min-h-[120px] rounded-3xl",
                                                value: profile.bio,
                                                placeholder: "Share highlights for recruiters...",
                                                onChange: (e)=>setProfile((prev)=>({
                                                            ...prev,
                                                            bio: e.target.value
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 56,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/settings/settings-page.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "rounded-full",
                                        children: "Save profile"
                                    }, void 0, false, {
                                        fileName: "[project]/features/settings/settings-page.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/settings/settings-page.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/settings/settings-page.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "border-none bg-card/80 shadow-lg shadow-black/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-lg",
                                            children: "Security"
                                        }, void 0, false, {
                                            fileName: "[project]/features/settings/settings-page.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/features/settings/settings-page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "password",
                                                placeholder: "Current password"
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "password",
                                                placeholder: "New password"
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 74,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "password",
                                                placeholder: "Confirm password"
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 75,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                className: "w-full rounded-full",
                                                children: "Change password"
                                            }, void 0, false, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 76,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/settings/settings-page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/settings/settings-page.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "border-none bg-card/80 shadow-lg shadow-black/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            className: "text-lg",
                                            children: "Preferences"
                                        }, void 0, false, {
                                            fileName: "[project]/features/settings/settings-page.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/features/settings/settings-page.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between rounded-2xl border border-border/40 bg-background/30 px-4 py-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-semibold",
                                                                children: "Theme"
                                                            }, void 0, false, {
                                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                                lineNumber: 87,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: "Toggle between light and dark mode"
                                                            }, void 0, false, {
                                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                                lineNumber: 88,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/features/settings/settings-page.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "secondary",
                                                        className: "rounded-full",
                                                        onClick: toggleTheme,
                                                        children: theme === 'dark' ? 'Dark' : 'Light'
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/settings/settings-page.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 85,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between rounded-2xl border border-border/40 bg-background/30 px-4 py-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm font-semibold",
                                                                children: "Language"
                                                            }, void 0, false, {
                                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                                lineNumber: 96,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: "UI language for AI explanations"
                                                            }, void 0, false, {
                                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                                lineNumber: 97,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/features/settings/settings-page.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: language,
                                                        onChange: (e)=>setLanguage(e.target.value),
                                                        className: "rounded-full border border-border bg-background/70 px-4 py-2 text-sm",
                                                        children: languages.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                children: option
                                                            }, option, false, {
                                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                                lineNumber: 105,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/settings/settings-page.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/settings/settings-page.tsx",
                                                lineNumber: 94,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/settings/settings-page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/settings/settings-page.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/settings/settings-page.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/settings/settings-page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/settings/settings-page.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(SettingsPage, "jlVnoRjWAI6QpHxDoyTF538YKTs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$providers$2f$theme$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = SettingsPage;
var _c;
__turbopack_context__.k.register(_c, "SettingsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/services/job-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "jobService",
    ()=>jobService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/api-client.ts [app-client] (ecmascript)");
;
// Map backend JobDto to frontend Job
function mapJobDtoToJob(dto) {
    return {
        id: dto.Id ?? dto.id,
        userId: dto.UserId ?? dto.userId,
        title: dto.Title ?? dto.title,
        company: dto.Company ?? dto.company,
        rawText: dto.RawText ?? dto.rawText,
        jobDescription: dto.JobDescription ?? dto.jobDescription,
        status: dto.Status ?? dto.status,
        createdAt: dto.CreatedAt ?? dto.createdAt,
        updatedAt: dto.UpdatedAt ?? dto.updatedAt
    };
}
async function withFallback(request, fallback) {
    try {
        return await request();
    } catch (error) {
        console.warn('[jobService] falling back to mock data', error);
        return fallback();
    }
}
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
let jobStore = [
    {
        id: 1,
        userId: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        jobDescription: 'We are looking for an experienced software engineer...',
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        userId: 1,
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        jobDescription: 'Join our dynamic team as a full stack developer...',
        status: 'Active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
const jobService = {
    async getJobs (searchTerm, status, userId) {
        return withFallback(async ()=>{
            const params = {};
            if (searchTerm) params.searchTerm = searchTerm;
            if (status) params.status = status;
            if (userId) params.userId = userId;
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/job/search`, {
                params
            });
            return Array.isArray(response.data) ? response.data.map(mapJobDtoToJob) : [];
        }, async ()=>{
            await delay(300);
            let filtered = [
                ...jobStore
            ];
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter((job)=>job.title.toLowerCase().includes(term) || job.company.toLowerCase().includes(term) || job.jobDescription?.toLowerCase().includes(term));
            }
            if (status) {
                filtered = filtered.filter((job)=>job.status === status);
            }
            if (userId) {
                filtered = filtered.filter((job)=>job.userId === userId);
            }
            return filtered;
        });
    },
    async getUserJobs (userId) {
        return withFallback(async ()=>{
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/job/user/${userId}`);
            return Array.isArray(response.data) ? response.data.map(mapJobDtoToJob) : [];
        }, async ()=>{
            await delay(300);
            return jobStore.filter((job)=>job.userId === userId);
        });
    },
    async getJob (id) {
        return withFallback(async ()=>{
            const userId = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem('matchcv-userId') : "TURBOPACK unreachable";
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/job/${id}`, {
                params: userId ? {
                    userId: parseInt(userId, 10)
                } : {}
            });
            return mapJobDtoToJob(response.data);
        }, async ()=>{
            await delay(200);
            return jobStore.find((job)=>job.id === id) || null;
        });
    },
    async createJob (payload) {
        return withFallback(async ()=>{
            const userId = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem('matchcv-userId') : "TURBOPACK unreachable";
            if (!userId) {
                throw new Error('User ID not found');
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/job/create', {
                Title: payload.title,
                Company: payload.company,
                JobDescription: payload.jobDescription,
                RawText: payload.rawText
            }, {
                params: {
                    userId: parseInt(userId, 10)
                }
            });
            return mapJobDtoToJob(response.data);
        }, async ()=>{
            await delay(250);
            const newJob = {
                id: Date.now(),
                userId: 1,
                title: payload.title,
                company: payload.company,
                jobDescription: payload.jobDescription,
                rawText: payload.rawText,
                status: 'Active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            jobStore = [
                newJob,
                ...jobStore
            ];
            return newJob;
        });
    },
    async updateJob (payload) {
        return withFallback(async ()=>{
            const userId = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem('matchcv-userId') : "TURBOPACK unreachable";
            if (!userId) {
                throw new Error('User ID not found');
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/job/${payload.id}`, {
                Title: payload.title,
                Company: payload.company,
                JobDescription: payload.jobDescription,
                RawText: payload.rawText,
                Status: payload.status
            }, {
                params: {
                    userId: parseInt(userId, 10)
                }
            });
            return mapJobDtoToJob(response.data);
        }, async ()=>{
            await delay(200);
            jobStore = jobStore.map((job)=>job.id === payload.id ? {
                    ...job,
                    ...payload
                } : job);
            const updated = jobStore.find((job)=>job.id === payload.id);
            if (!updated) {
                throw new Error('Job not found');
            }
            return updated;
        });
    },
    async deleteJob (id) {
        return withFallback(async ()=>{
            const userId = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem('matchcv-userId') : "TURBOPACK unreachable";
            if (!userId) {
                throw new Error('User ID not found');
            }
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/job/${id}`, {
                params: {
                    userId: parseInt(userId, 10)
                }
            });
        }, async ()=>{
            await delay(150);
            jobStore = jobStore.filter((job)=>job.id !== id);
        });
    },
    async uploadJob (file) {
        return withFallback(async ()=>{
            const userId = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem('matchcv-userId') : "TURBOPACK unreachable";
            if (!userId) {
                throw new Error('User ID not found');
            }
            const formData = new FormData();
            formData.append('file', file);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/job/upload`, formData, {
                params: {
                    userId: parseInt(userId, 10)
                }
            });
            return mapJobDtoToJob(response.data);
        }, async ()=>{
            await delay(600);
            const newJob = {
                id: Date.now(),
                userId: 1,
                title: file.name.replace(/\.[^/.]+$/, ''),
                company: 'Uploaded Company',
                rawText: `Content from ${file.name}`,
                jobDescription: `Job description extracted from ${file.name}`,
                status: 'Active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            jobStore = [
                newJob,
                ...jobStore
            ];
            return newJob;
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/useJob.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useJob",
    ()=>useJob
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/services/job-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/toast-context.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useJob() {
    _s();
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToastContext"])();
    const fetchJobs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useJob.useCallback[fetchJobs]": async (searchTerm, status, userId)=>{
            setLoading(true);
            setError(null);
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jobService"].getJobs(searchTerm, status, userId);
                setJobs(data);
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Unable to load jobs';
                setError(message);
                toast.error('Failed to load jobs', message);
            } finally{
                setLoading(false);
            }
        }
    }["useJob.useCallback[fetchJobs]"], [
        toast
    ]);
    const fetchUserJobs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useJob.useCallback[fetchUserJobs]": async (userId)=>{
            setLoading(true);
            setError(null);
            try {
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jobService"].getUserJobs(userId);
                setJobs(data);
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Unable to load jobs';
                setError(message);
                toast.error('Failed to load jobs', message);
            } finally{
                setLoading(false);
            }
        }
    }["useJob.useCallback[fetchUserJobs]"], [
        toast
    ]);
    const createJob = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useJob.useCallback[createJob]": async (payload)=>{
            try {
                const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jobService"].createJob(payload);
                toast.success('Job created successfully', `"${payload.title}" has been created`);
                await fetchJobs();
                return created;
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to create job';
                toast.error('Failed to create job', message);
                throw err;
            }
        }
    }["useJob.useCallback[createJob]"], [
        toast,
        fetchJobs
    ]);
    const updateJob = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useJob.useCallback[updateJob]": async (payload)=>{
            try {
                const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jobService"].updateJob(payload);
                toast.success('Job updated successfully', 'The job has been updated');
                await fetchJobs();
                return updated;
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to update job';
                toast.error('Failed to update job', message);
                throw err;
            }
        }
    }["useJob.useCallback[updateJob]"], [
        toast,
        fetchJobs
    ]);
    const deleteJob = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useJob.useCallback[deleteJob]": async (id)=>{
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jobService"].deleteJob(id);
                setJobs({
                    "useJob.useCallback[deleteJob]": (prev)=>prev.filter({
                            "useJob.useCallback[deleteJob]": (job)=>job.id !== id
                        }["useJob.useCallback[deleteJob]"])
                }["useJob.useCallback[deleteJob]"]);
                toast.success('Job deleted', 'The job has been removed');
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to delete job';
                toast.error('Failed to delete job', message);
                throw err;
            }
        }
    }["useJob.useCallback[deleteJob]"], [
        toast
    ]);
    const uploadJob = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useJob.useCallback[uploadJob]": async (file)=>{
            try {
                const created = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$services$2f$job$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jobService"].uploadJob(file);
                toast.success('Job uploaded successfully', `"${created.title}" has been created from file`);
                await fetchJobs();
                return created;
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to upload job';
                toast.error('Failed to upload job', message);
                throw err;
            }
        }
    }["useJob.useCallback[uploadJob]"], [
        toast,
        fetchJobs
    ]);
    return {
        jobs,
        loading,
        error,
        refresh: fetchJobs,
        fetchUserJobs,
        createJob,
        updateJob,
        deleteJob,
        uploadJob,
        setJobs
    };
}
_s(useJob, "wUPV6uKy7R+srJGJVq31Fbxp5zY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToastContext"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/jobs/job-search-page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JobSearchPage",
    ()=>JobSearchPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useJob$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useJob.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function JobSearchPage() {
    _s();
    const { jobs, loading, refresh } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useJob$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useJob"])();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JobSearchPage.useEffect": ()=>{
            refresh(searchQuery || undefined, statusFilter || undefined);
        }
    }["JobSearchPage.useEffect"], [
        searchQuery,
        statusFilter,
        refresh
    ]);
    // Jobs are already filtered by the API call in refresh()
    const filteredJobs = jobs;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm uppercase tracking-[0.4em] text-muted-foreground",
                            children: "Job Market"
                        }, void 0, false, {
                            fileName: "[project]/features/jobs/job-search-page.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-semibold text-card-foreground",
                            children: "Find Jobs"
                        }, void 0, false, {
                            fileName: "[project]/features/jobs/job-search-page.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground",
                            children: "Search and discover job opportunities that match your skills."
                        }, void 0, false, {
                            fileName: "[project]/features/jobs/job-search-page.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/jobs/job-search-page.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/jobs/job-search-page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-3xl border border-border/40 bg-card/80 p-4 shadow-2xl shadow-black/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 md:flex-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/features/jobs/job-search-page.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "text",
                                        placeholder: "Search jobs by title, company, or description...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "w-full pl-12 pr-4"
                                    }, void 0, false, {
                                        fileName: "[project]/features/jobs/job-search-page.tsx",
                                        lineNumber: 40,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/jobs/job-search-page.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: statusFilter,
                                    onChange: (e)=>setStatusFilter(e.target.value),
                                    className: "h-10 rounded-2xl border border-input bg-background/80 px-4 text-sm outline-none transition focus:ring-2 focus:ring-primary/40",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "All Status"
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/job-search-page.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Active",
                                            children: "Active"
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/job-search-page.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Closed",
                                            children: "Closed"
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/job-search-page.tsx",
                                            lineNumber: 56,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "Draft",
                                            children: "Draft"
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/job-search-page.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/jobs/job-search-page.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/jobs/job-search-page.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/jobs/job-search-page.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-muted-foreground",
                        children: [
                            "Found ",
                            filteredJobs.length,
                            " job",
                            filteredJobs.length !== 1 ? 's' : '',
                            ' matching "',
                            searchQuery,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/jobs/job-search-page.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/jobs/job-search-page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-full py-8 text-center text-muted-foreground",
                    children: "Loading jobs..."
                }, void 0, false, {
                    fileName: "[project]/features/jobs/job-search-page.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this) : filteredJobs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "col-span-full py-8 text-center text-muted-foreground",
                    children: searchQuery ? 'No jobs found matching your search.' : 'No jobs available. Be the first to post one!'
                }, void 0, false, {
                    fileName: "[project]/features/jobs/job-search-page.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                }, this) : filteredJobs.map((job)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(JobCard, {
                        job: job
                    }, job.id, false, {
                        fileName: "[project]/features/jobs/job-search-page.tsx",
                        lineNumber: 77,
                        columnNumber: 37
                    }, this))
            }, void 0, false, {
                fileName: "[project]/features/jobs/job-search-page.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/jobs/job-search-page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(JobSearchPage, "SyScLBsiJ6Wt0dMxKZmykUioXfE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useJob$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useJob"]
    ];
});
_c = JobSearchPage;
function JobCard({ job }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "flex flex-col gap-4 rounded-3xl border border-border/40 bg-card/80 p-6 shadow-2xl shadow-black/5 transition hover:shadow-black/10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-semibold text-card-foreground",
                                children: job.title
                            }, void 0, false, {
                                fileName: "[project]/features/jobs/job-search-page.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 flex items-center gap-2 text-sm text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                        className: "size-4"
                                    }, void 0, false, {
                                        fileName: "[project]/features/jobs/job-search-page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: job.company
                                    }, void 0, false, {
                                        fileName: "[project]/features/jobs/job-search-page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/jobs/job-search-page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/jobs/job-search-page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                        variant: job.status === 'Active' ? 'default' : 'secondary',
                        className: "rounded-full",
                        children: job.status
                    }, void 0, false, {
                        fileName: "[project]/features/jobs/job-search-page.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/jobs/job-search-page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            job.jobDescription && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "line-clamp-3 text-sm text-muted-foreground",
                children: job.jobDescription.length > 150 ? `${job.jobDescription.substring(0, 150)}...` : job.jobDescription
            }, void 0, false, {
                fileName: "[project]/features/jobs/job-search-page.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto flex items-center justify-between border-t border-border/30 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                className: "size-3"
                            }, void 0, false, {
                                fileName: "[project]/features/jobs/job-search-page.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(job.createdAt), {
                                    addSuffix: true
                                })
                            }, void 0, false, {
                                fileName: "[project]/features/jobs/job-search-page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/jobs/job-search-page.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        size: "sm",
                        variant: "outline",
                        className: "rounded-full",
                        children: "View Details"
                    }, void 0, false, {
                        fileName: "[project]/features/jobs/job-search-page.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/jobs/job-search-page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/jobs/job-search-page.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c1 = JobCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "JobSearchPage");
__turbopack_context__.k.register(_c1, "JobCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/jobs/post-job-page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostJobPage",
    ()=>PostJobPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useJob$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useJob.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/toast-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function PostJobPage() {
    _s();
    const { createJob, uploadJob } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useJob$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useJob"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToastContext"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadedFile, setUploadedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        title: '',
        company: '',
        jobDescription: '',
        rawText: ''
    });
    const handleFileChange = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            const allowedTypes = [
                'application/pdf',
                'text/plain'
            ];
            const allowedExtensions = [
                '.pdf',
                '.txt'
            ];
            const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(extension)) {
                toast.error('Invalid file type', 'Please upload a PDF or TXT file');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File too large', 'File size must be less than 10MB');
                return;
            }
            setUploadedFile(file);
        }
    };
    const handleRemoveFile = ()=>{
        setUploadedFile(null);
    };
    const handleInputChange = (field, value)=>{
        setFormData((prev)=>({
                ...prev,
                [field]: value
            }));
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            if (uploadedFile) {
                await uploadJob(uploadedFile);
                setUploadedFile(null);
            } else {
                if (!formData.title || !formData.company) {
                    toast.error('Validation error', 'Title and Company are required');
                    setLoading(false);
                    return;
                }
                await createJob(formData);
            }
            // Reset form
            setFormData({
                title: '',
                company: '',
                jobDescription: '',
                rawText: ''
            });
        } catch (err) {
        // Error is handled by useJob hook
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm uppercase tracking-[0.4em] text-muted-foreground",
                        children: "Job Management"
                    }, void 0, false, {
                        fileName: "[project]/features/jobs/post-job-page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-semibold text-card-foreground",
                        children: "Post a Job"
                    }, void 0, false, {
                        fileName: "[project]/features/jobs/post-job-page.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Create a new job posting or upload from a file."
                    }, void 0, false, {
                        fileName: "[project]/features/jobs/post-job-page.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/jobs/post-job-page.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "rounded-3xl border border-border/40 bg-card/80 p-6 shadow-2xl shadow-black/5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium text-card-foreground",
                                    children: "Upload Job Description (PDF or TXT)"
                                }, void 0, false, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex cursor-pointer items-center gap-2 rounded-2xl border border-border/60 bg-background/80 px-4 py-2 text-sm transition hover:bg-background",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                    className: "size-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Choose File"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    accept: ".pdf,.txt",
                                                    onChange: handleFileChange,
                                                    className: "hidden"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, this),
                                        uploadedFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 rounded-2xl bg-muted/40 px-3 py-1.5 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    className: "size-4 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                                    lineNumber: 111,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-muted-foreground",
                                                    children: uploadedFile.name
                                                }, void 0, false, {
                                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleRemoveFile,
                                                    className: "ml-2 text-muted-foreground hover:text-destructive",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        className: "size-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/jobs/post-job-page.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Upload a PDF or TXT file containing the job description. Maximum file size: 10MB"
                                }, void 0, false, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/jobs/post-job-page.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 flex items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-full border-t border-border/30"
                                    }, void 0, false, {
                                        fileName: "[project]/features/jobs/post-job-page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative flex justify-center text-xs uppercase",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-card/80 px-2 text-muted-foreground",
                                        children: "Or Enter Manually"
                                    }, void 0, false, {
                                        fileName: "[project]/features/jobs/post-job-page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/jobs/post-job-page.tsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "title",
                                            className: "mb-2 block text-sm font-medium text-card-foreground",
                                            children: [
                                                "Job Title ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-destructive",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "title",
                                            value: formData.title,
                                            onChange: (e)=>handleInputChange('title', e.target.value),
                                            placeholder: "e.g., Senior Software Engineer",
                                            required: !uploadedFile,
                                            disabled: !!uploadedFile
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "company",
                                            className: "mb-2 block text-sm font-medium text-card-foreground",
                                            children: [
                                                "Company Name ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-destructive",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 30
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 154,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "company",
                                            value: formData.company,
                                            onChange: (e)=>handleInputChange('company', e.target.value),
                                            placeholder: "e.g., Tech Corp",
                                            required: !uploadedFile,
                                            disabled: !!uploadedFile
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "description",
                                            className: "mb-2 block text-sm font-medium text-card-foreground",
                                            children: "Job Description"
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                            id: "description",
                                            value: formData.jobDescription,
                                            onChange: (e)=>handleInputChange('jobDescription', e.target.value),
                                            placeholder: "Enter the full job description...",
                                            rows: 8,
                                            disabled: !!uploadedFile
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "rawText",
                                            className: "mb-2 block text-sm font-medium text-card-foreground",
                                            children: "Raw Text (Optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                            id: "rawText",
                                            value: formData.rawText,
                                            onChange: (e)=>handleInputChange('rawText', e.target.value),
                                            placeholder: "Additional raw text content...",
                                            rows: 4,
                                            disabled: !!uploadedFile
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/jobs/post-job-page.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "outline",
                                    onClick: ()=>{
                                        setFormData({
                                            title: '',
                                            company: '',
                                            jobDescription: '',
                                            rawText: ''
                                        });
                                        setUploadedFile(null);
                                    },
                                    disabled: loading,
                                    children: "Clear"
                                }, void 0, false, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 197,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    disabled: loading,
                                    className: "gap-2 rounded-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "size-4"
                                        }, void 0, false, {
                                            fileName: "[project]/features/jobs/post-job-page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, this),
                                        loading ? 'Creating...' : uploadedFile ? 'Upload Job' : 'Create Job'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/jobs/post-job-page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/jobs/post-job-page.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/jobs/post-job-page.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/jobs/post-job-page.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/jobs/post-job-page.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(PostJobPage, "/R3P+9OevFa0dE/X5bDT2c/hRMw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useJob$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useJob"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToastContext"]
    ];
});
_c = PostJobPage;
var _c;
__turbopack_context__.k.register(_c, "PostJobPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/axiosConfig.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const API_BASE_URL = '/api';
console.log('API_BASE_URL:', API_BASE_URL);
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/templateApi.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "exportCvPdf",
    ()=>exportCvPdf,
    "getTemplates",
    ()=>getTemplates,
    "previewCv",
    ()=>previewCv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/axiosConfig.js [app-client] (ecmascript)");
;
const getTemplates = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get('/Template');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách mẫu CV:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        // Trả về danh sách mẫu mặc định nếu API gặp lỗi
        return [
            {
                id: 1,
                key: 'professional',
                name: 'Mẫu Chuyên Nghiệp',
                description: 'Thiết kế chuyên nghiệp với tông màu đỏ',
                thumbnail: '/templates/professional.jpg'
            },
            {
                id: 2,
                key: 'modern',
                name: 'Mẫu Hiện Đại',
                description: 'Thiết kế hiện đại với tông màu tím',
                thumbnail: '/templates/modern.jpg'
            },
            {
                id: 3,
                key: 'formal',
                name: 'Mẫu Truyền Thống',
                description: 'Thiết kế truyền thống, trang trọng',
                thumbnail: '/templates/formal.jpg'
            }
        ];
    }
};
const previewCv = async (cvData)=>{
    try {
        console.log('Gọi API preview');
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/Template/preview', cvData, {
            responseType: 'text'
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API preview:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};
const exportCvPdf = async (cvData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post('/Template/export/pdf', cvData, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API export PDF:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/cvApi.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteCV",
    ()=>deleteCV,
    "getCVById",
    ()=>getCVById,
    "getCVHistory",
    ()=>getCVHistory,
    "saveCV",
    ()=>saveCV,
    "updateCV",
    ()=>updateCV
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/axiosConfig.js [app-client] (ecmascript)");
;
// Hardcoded user ID for now as there is no auth context
const DEFAULT_USER_ID = 1;
const saveCV = async (cvData)=>{
    // Ensure userId is passed
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/CV/save?userId=${DEFAULT_USER_ID}`, cvData);
    return response.data.data || response.data;
};
const getCVHistory = async ()=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/CV/user/${DEFAULT_USER_ID}`);
    return response.data.data || response.data;
};
const getCVById = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/CV/${id}?userId=${DEFAULT_USER_ID}`);
    return response.data.data || response.data;
};
const updateCV = async (id, cvData)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].put(`/CV/${id}?userId=${DEFAULT_USER_ID}`, cvData);
    return response.data.data || response.data;
};
const deleteCV = async (id)=>{
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$axiosConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].delete(`/CV/${id}?userId=${DEFAULT_USER_ID}`);
    return response.data.data || response.data;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LiveCV/EditableField.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
/**
 * EditableField - A component that displays text but becomes editable on click
 * @param {string} value - Current value
 * @param {function} onChange - Callback when value changes
 * @param {string} placeholder - Placeholder text
 * @param {string} type - 'text', 'textarea', or 'contenteditable'
 * @param {string} className - Additional CSS classes
 * @param {string} tag - HTML tag to render (h1, h2, p, span, etc.)
 */ function EditableField({ value = '', onChange, placeholder = 'Click to edit', type = 'text', className = '', tag = 'p', multiline = false, disabled = false }) {
    _s();
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localValue, setLocalValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const contentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableField.useEffect": ()=>{
            setLocalValue(value);
        }
    }["EditableField.useEffect"], [
        value
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EditableField.useEffect": ()=>{
            if (isEditing && inputRef.current) {
                inputRef.current.focus();
                if (type === 'text') {
                    inputRef.current.select();
                }
            }
        }
    }["EditableField.useEffect"], [
        isEditing,
        type
    ]);
    const handleClick = ()=>{
        if (!disabled) {
            setIsEditing(true);
        }
    };
    const handleBlur = ()=>{
        setIsEditing(false);
        if (onChange && localValue !== value) {
            onChange(localValue);
        }
    };
    const handleChange = (e)=>{
        setLocalValue(e.target.value);
    };
    const handleKeyDown = (e)=>{
        if (type === 'text' && e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
        }
        if (e.key === 'Escape') {
            setLocalValue(value);
            setIsEditing(false);
        }
    };
    const handleContentEditableBlur = (e)=>{
        const newValue = e.target.innerText;
        setLocalValue(newValue);
        setIsEditing(false);
        if (onChange && newValue !== value) {
            onChange(newValue);
        }
    };
    const handleContentEditableInput = (e)=>{
        setLocalValue(e.target.innerText);
    };
    // For contentEditable mode
    if (type === 'contenteditable') {
        const Tag = tag;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
            ref: contentRef,
            className: `editable-field ${className} ${!localValue ? 'empty' : ''}`,
            contentEditable: !disabled,
            suppressContentEditableWarning: true,
            onBlur: handleContentEditableBlur,
            onInput: handleContentEditableInput,
            "data-placeholder": placeholder,
            children: localValue
        }, void 0, false, {
            fileName: "[project]/src/components/LiveCV/EditableField.jsx",
            lineNumber: 86,
            columnNumber: 13
        }, this);
    }
    // For input/textarea mode
    if (isEditing) {
        if (multiline || type === 'textarea') {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                ref: inputRef,
                className: `editable-field-input ${className}`,
                value: localValue,
                onChange: handleChange,
                onBlur: handleBlur,
                onKeyDown: handleKeyDown,
                placeholder: placeholder,
                rows: 3
            }, void 0, false, {
                fileName: "[project]/src/components/LiveCV/EditableField.jsx",
                lineNumber: 104,
                columnNumber: 17
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            ref: inputRef,
            type: "text",
            className: `editable-field-input ${className}`,
            value: localValue,
            onChange: handleChange,
            onBlur: handleBlur,
            onKeyDown: handleKeyDown,
            placeholder: placeholder
        }, void 0, false, {
            fileName: "[project]/src/components/LiveCV/EditableField.jsx",
            lineNumber: 117,
            columnNumber: 13
        }, this);
    }
    // Display mode
    const Tag = tag;
    const displayValue = localValue || (disabled ? '' : placeholder);
    if (disabled && !displayValue) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
        className: `editable-field ${className} ${!localValue ? 'empty' : ''} ${disabled ? 'read-only' : ''}`,
        onClick: handleClick,
        title: disabled ? undefined : "Click to edit",
        children: displayValue
    }, void 0, false, {
        fileName: "[project]/src/components/LiveCV/EditableField.jsx",
        lineNumber: 137,
        columnNumber: 9
    }, this);
}
_s(EditableField, "Dmqvsn9rQrhEvvUNp6niQ7jG3iQ=");
_c = EditableField;
const __TURBOPACK__default__export__ = EditableField;
var _c;
__turbopack_context__.k.register(_c, "EditableField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LiveCV/EditableField.jsx [app-client] (ecmascript)");
;
;
;
;
function ProfessionalTemplate({ cvData, onUpdate }) {
    const updatePersonalInfo = (field, value)=>{
        onUpdate({
            ...cvData,
            personalInfo: {
                ...cvData.personalInfo,
                [field]: value
            }
        });
    };
    const updateExperience = (id, field, value)=>{
        onUpdate({
            ...cvData,
            experiences: cvData.experiences.map((exp)=>exp.id === id ? {
                    ...exp,
                    [field]: value
                } : exp)
        });
    };
    const addExperience = ()=>{
        onUpdate({
            ...cvData,
            experiences: [
                ...cvData.experiences,
                {
                    id: Date.now(),
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                }
            ]
        });
    };
    const removeExperience = (id)=>{
        onUpdate({
            ...cvData,
            experiences: cvData.experiences.filter((exp)=>exp.id !== id)
        });
    };
    const updateEducation = (id, field, value)=>{
        onUpdate({
            ...cvData,
            educations: cvData.educations.map((edu)=>edu.id === id ? {
                    ...edu,
                    [field]: value
                } : edu)
        });
    };
    const addEducation = ()=>{
        onUpdate({
            ...cvData,
            educations: [
                ...cvData.educations,
                {
                    id: Date.now(),
                    institution: '',
                    degree: '',
                    fieldOfStudy: '',
                    startYear: '',
                    endYear: ''
                }
            ]
        });
    };
    const removeEducation = (id)=>{
        onUpdate({
            ...cvData,
            educations: cvData.educations.filter((edu)=>edu.id !== id)
        });
    };
    const updateSkill = (id, field, value)=>{
        onUpdate({
            ...cvData,
            skills: cvData.skills.map((skill)=>skill.id === id ? {
                    ...skill,
                    [field]: value
                } : skill)
        });
    };
    const addSkill = ()=>{
        onUpdate({
            ...cvData,
            skills: [
                ...cvData.skills,
                {
                    id: Date.now(),
                    name: '',
                    level: ''
                }
            ]
        });
    };
    const removeSkill = (id)=>{
        onUpdate({
            ...cvData,
            skills: cvData.skills.filter((skill)=>skill.id !== id)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "professional-cv-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "professional-sidebar",
                children: [
                    cvData.personalInfo?.avatarBase64 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "avatar-container",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: `data:image/png;base64,${cvData.personalInfo.avatarBase64}`,
                            alt: "Avatar",
                            className: "avatar"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                            lineNumber: 114,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                        lineNumber: 113,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "section-title-sm",
                                children: "Thông tin liên hệ"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                lineNumber: 124,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "contact-list",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "contact-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-icons contact-icon",
                                                children: "email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                lineNumber: 127,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                value: cvData.personalInfo?.email,
                                                onChange: (val)=>updatePersonalInfo('email', val),
                                                placeholder: "email@example.com",
                                                tag: "span"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                lineNumber: 128,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                        lineNumber: 126,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "contact-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-icons contact-icon",
                                                children: "phone"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                lineNumber: 136,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                value: cvData.personalInfo?.phone,
                                                onChange: (val)=>updatePersonalInfo('phone', val),
                                                placeholder: "0123 456 789",
                                                tag: "span"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                lineNumber: 137,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                        lineNumber: 135,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "contact-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-icons contact-icon",
                                                children: "home"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                lineNumber: 145,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                value: cvData.personalInfo?.address,
                                                onChange: (val)=>updatePersonalInfo('address', val),
                                                placeholder: "Địa chỉ",
                                                tag: "span"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                lineNumber: 146,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                        lineNumber: 144,
                                        columnNumber: 25
                                    }, this),
                                    cvData.personalInfo?.website && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "contact-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-icons contact-icon",
                                                children: "language"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                lineNumber: 155,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                value: cvData.personalInfo?.website,
                                                onChange: (val)=>updatePersonalInfo('website', val),
                                                placeholder: "website.com",
                                                tag: "span"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                lineNumber: 156,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                        lineNumber: 154,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                lineNumber: 125,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                        lineNumber: 123,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section",
                        style: {
                            marginTop: '30px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "section-title-sm",
                                children: [
                                    "Kỹ năng",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "add-btn-inline",
                                        onClick: addSkill,
                                        title: "Thêm kỹ năng",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-icons",
                                            children: "add"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                            lineNumber: 172,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                        lineNumber: 171,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                lineNumber: 169,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "skill-list",
                                children: cvData.skills?.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "skill-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "skill-item-content",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        value: skill.name,
                                                        onChange: (val)=>updateSkill(skill.id, 'name', val),
                                                        placeholder: "Tên kỹ năng",
                                                        tag: "span",
                                                        className: "skill-name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                        lineNumber: 179,
                                                        columnNumber: 37
                                                    }, this),
                                                    skill.level && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        value: skill.level,
                                                        onChange: (val)=>updateSkill(skill.id, 'level', val),
                                                        placeholder: "Mức độ",
                                                        tag: "span",
                                                        className: "skill-level"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                        lineNumber: 187,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                lineNumber: 178,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "remove-btn-inline",
                                                onClick: ()=>removeSkill(skill.id),
                                                title: "Xóa",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-icons",
                                                    children: "close"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 201,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                lineNumber: 196,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, skill.id, true, {
                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                        lineNumber: 177,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                lineNumber: 175,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                        lineNumber: 168,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                lineNumber: 110,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "professional-main-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "header-section",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: cvData.personalInfo?.fullName,
                                onChange: (val)=>updatePersonalInfo('fullName', val),
                                placeholder: "Họ và Tên",
                                tag: "h1",
                                className: "name"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                lineNumber: 212,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: cvData.personalInfo?.position || cvData.experiences?.[0]?.position,
                                onChange: (val)=>updatePersonalInfo('position', val),
                                placeholder: "Vị trí ứng tuyển",
                                tag: "h3",
                                className: "job-title-main"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                lineNumber: 219,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                        lineNumber: 211,
                        columnNumber: 17
                    }, this),
                    cvData.personalInfo?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "section-title-lg",
                                children: "Tóm tắt chuyên môn"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                lineNumber: 231,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: cvData.personalInfo?.summary,
                                onChange: (val)=>updatePersonalInfo('summary', val),
                                placeholder: "Mô tả ngắn gọn về bản thân...",
                                tag: "p",
                                className: "summary-text",
                                multiline: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                lineNumber: 232,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                        lineNumber: 230,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "section-title-lg",
                                children: [
                                    "Kinh nghiệm làm việc",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "add-btn-inline",
                                        onClick: addExperience,
                                        title: "Thêm kinh nghiệm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-icons",
                                            children: "add"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                            lineNumber: 248,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                        lineNumber: 247,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                lineNumber: 245,
                                columnNumber: 21
                            }, this),
                            cvData.experiences?.map((exp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "timeline-item",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "timeline-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: exp.startDate,
                                                    onChange: (val)=>updateExperience(exp.id, 'startDate', val),
                                                    placeholder: "MM/YYYY",
                                                    tag: "span"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 254,
                                                    columnNumber: 33
                                                }, this),
                                                ' - ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: exp.endDate || 'Hiện tại',
                                                    onChange: (val)=>updateExperience(exp.id, 'endDate', val),
                                                    placeholder: "MM/YYYY",
                                                    tag: "span"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 261,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                            lineNumber: 253,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "timeline-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "remove-btn-inline",
                                                    onClick: ()=>removeExperience(exp.id),
                                                    title: "Xóa",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-icons",
                                                        children: "close"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                        lineNumber: 274,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 269,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: exp.position,
                                                    onChange: (val)=>updateExperience(exp.id, 'position', val),
                                                    placeholder: "Vị trí",
                                                    tag: "h3",
                                                    className: "timeline-title"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 276,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: exp.company,
                                                    onChange: (val)=>updateExperience(exp.id, 'company', val),
                                                    placeholder: "Tên công ty",
                                                    tag: "p",
                                                    className: "timeline-subtitle"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 283,
                                                    columnNumber: 33
                                                }, this),
                                                exp.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: exp.description,
                                                    onChange: (val)=>updateExperience(exp.id, 'description', val),
                                                    placeholder: "Mô tả công việc...",
                                                    tag: "div",
                                                    className: "timeline-desc",
                                                    multiline: true
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 291,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                            lineNumber: 268,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, exp.id, true, {
                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                    lineNumber: 252,
                                    columnNumber: 25
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                        lineNumber: 244,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "section-title-lg",
                                children: [
                                    "Học vấn",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "add-btn-inline",
                                        onClick: addEducation,
                                        title: "Thêm học vấn",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-icons",
                                            children: "add"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                            lineNumber: 310,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                        lineNumber: 309,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                lineNumber: 307,
                                columnNumber: 21
                            }, this),
                            cvData.educations?.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "timeline-item",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "timeline-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: edu.startYear,
                                                    onChange: (val)=>updateEducation(edu.id, 'startYear', val),
                                                    placeholder: "YYYY",
                                                    tag: "span"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 316,
                                                    columnNumber: 33
                                                }, this),
                                                ' - ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: edu.endYear || 'Nay',
                                                    onChange: (val)=>updateEducation(edu.id, 'endYear', val),
                                                    placeholder: "YYYY",
                                                    tag: "span"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 323,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                            lineNumber: 315,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "timeline-right",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "remove-btn-inline",
                                                    onClick: ()=>removeEducation(edu.id),
                                                    title: "Xóa",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-icons",
                                                        children: "close"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                        lineNumber: 336,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 331,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: edu.degree,
                                                    onChange: (val)=>updateEducation(edu.id, 'degree', val),
                                                    placeholder: "Bằng cấp",
                                                    tag: "h3",
                                                    className: "timeline-title"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 338,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: edu.institution,
                                                    onChange: (val)=>updateEducation(edu.id, 'institution', val),
                                                    placeholder: "Trường/Tổ chức",
                                                    tag: "p",
                                                    className: "timeline-subtitle"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 345,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "timeline-desc",
                                                    children: [
                                                        "Chuyên ngành: ",
                                                        ' ',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: edu.fieldOfStudy,
                                                            onChange: (val)=>updateEducation(edu.id, 'fieldOfStudy', val),
                                                            placeholder: "Chuyên ngành",
                                                            tag: "span"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                            lineNumber: 354,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                                    lineNumber: 352,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                            lineNumber: 330,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, edu.id, true, {
                                    fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                                    lineNumber: 314,
                                    columnNumber: 25
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                        lineNumber: 306,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
                lineNumber: 209,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx",
        lineNumber: 109,
        columnNumber: 9
    }, this);
}
_c = ProfessionalTemplate;
const __TURBOPACK__default__export__ = ProfessionalTemplate;
var _c;
__turbopack_context__.k.register(_c, "ProfessionalTemplate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LiveCV/templates/ModernTemplate.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LiveCV/EditableField.jsx [app-client] (ecmascript)");
;
;
;
function ModernTemplate({ cvData, onUpdate }) {
    const updatePersonalInfo = (field, value)=>{
        onUpdate({
            ...cvData,
            personalInfo: {
                ...cvData.personalInfo,
                [field]: value
            }
        });
    };
    const updateExperience = (id, field, value)=>{
        onUpdate({
            ...cvData,
            experiences: cvData.experiences.map((exp)=>exp.id === id ? {
                    ...exp,
                    [field]: value
                } : exp)
        });
    };
    const addExperience = ()=>{
        onUpdate({
            ...cvData,
            experiences: [
                ...cvData.experiences,
                {
                    id: Date.now(),
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                }
            ]
        });
    };
    const removeExperience = (id)=>{
        onUpdate({
            ...cvData,
            experiences: cvData.experiences.filter((exp)=>exp.id !== id)
        });
    };
    const updateEducation = (id, field, value)=>{
        onUpdate({
            ...cvData,
            educations: cvData.educations.map((edu)=>edu.id === id ? {
                    ...edu,
                    [field]: value
                } : edu)
        });
    };
    const addEducation = ()=>{
        onUpdate({
            ...cvData,
            educations: [
                ...cvData.educations,
                {
                    id: Date.now(),
                    institution: '',
                    degree: '',
                    fieldOfStudy: '',
                    startYear: '',
                    endYear: ''
                }
            ]
        });
    };
    const removeEducation = (id)=>{
        onUpdate({
            ...cvData,
            educations: cvData.educations.filter((edu)=>edu.id !== id)
        });
    };
    const updateSkill = (id, field, value)=>{
        onUpdate({
            ...cvData,
            skills: cvData.skills.map((skill)=>skill.id === id ? {
                    ...skill,
                    [field]: value
                } : skill)
        });
    };
    const addSkill = ()=>{
        onUpdate({
            ...cvData,
            skills: [
                ...cvData.skills,
                {
                    id: Date.now(),
                    name: '',
                    level: ''
                }
            ]
        });
    };
    const removeSkill = (id)=>{
        onUpdate({
            ...cvData,
            skills: cvData.skills.filter((skill)=>skill.id !== id)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modern-cv-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "modern-header",
                children: [
                    cvData.personalInfo?.avatarBase64 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: `data:image/png;base64,${cvData.personalInfo.avatarBase64}`,
                        alt: "Profile",
                        className: "profile-img"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                        lineNumber: 112,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        value: cvData.personalInfo?.fullName,
                        onChange: (val)=>updatePersonalInfo('fullName', val),
                        placeholder: "Họ và Tên",
                        tag: "h1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                        lineNumber: 118,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        value: cvData.personalInfo?.position || cvData.experiences?.[0]?.position,
                        onChange: (val)=>updatePersonalInfo('position', val),
                        placeholder: "Vị trí ứng tuyển",
                        tag: "h2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                        lineNumber: 124,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "contact-info",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "contact-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "email"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                        lineNumber: 134,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: cvData.personalInfo?.email,
                                        onChange: (val)=>updatePersonalInfo('email', val),
                                        placeholder: "email@example.com",
                                        tag: "span"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                        lineNumber: 135,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                lineNumber: 133,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "contact-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "phone"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                        lineNumber: 143,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: cvData.personalInfo?.phone,
                                        onChange: (val)=>updatePersonalInfo('phone', val),
                                        placeholder: "0123 456 789",
                                        tag: "span"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                        lineNumber: 144,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                lineNumber: 142,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "contact-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "home"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                        lineNumber: 152,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        value: cvData.personalInfo?.address,
                                        onChange: (val)=>updatePersonalInfo('address', val),
                                        placeholder: "Địa chỉ",
                                        tag: "span"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                        lineNumber: 153,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                lineNumber: 151,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                        lineNumber: 132,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                lineNumber: 110,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "modern-main",
                children: [
                    cvData.personalInfo?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "section-title",
                                children: "Tóm tắt chuyên môn"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                lineNumber: 167,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: cvData.personalInfo?.summary,
                                onChange: (val)=>updatePersonalInfo('summary', val),
                                placeholder: "Mô tả ngắn gọn về bản thân...",
                                tag: "p",
                                multiline: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                lineNumber: 168,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                        lineNumber: 166,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid-layout",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "section-title",
                                        children: [
                                            "Kinh nghiệm làm việc",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "add-btn-inline",
                                                onClick: addExperience,
                                                title: "Thêm kinh nghiệm",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-icons",
                                                    children: "add"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                    lineNumber: 185,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                lineNumber: 184,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                        lineNumber: 182,
                                        columnNumber: 25
                                    }, this),
                                    cvData.experiences?.map((exp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "timeline-item",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "timeline-header",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: exp.position,
                                                            onChange: (val)=>updateExperience(exp.id, 'position', val),
                                                            placeholder: "Vị trí",
                                                            tag: "h4",
                                                            className: "timeline-title"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                            lineNumber: 191,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "timeline-date",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    value: exp.startDate,
                                                                    onChange: (val)=>updateExperience(exp.id, 'startDate', val),
                                                                    placeholder: "MM/YYYY",
                                                                    tag: "span"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                                    lineNumber: 199,
                                                                    columnNumber: 41
                                                                }, this),
                                                                ' - ',
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    value: exp.endDate || 'Hiện tại',
                                                                    onChange: (val)=>updateExperience(exp.id, 'endDate', val),
                                                                    placeholder: "MM/YYYY",
                                                                    tag: "span"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                                    lineNumber: 206,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                            lineNumber: 198,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                    lineNumber: 190,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: exp.company,
                                                    onChange: (val)=>updateExperience(exp.id, 'company', val),
                                                    placeholder: "Tên công ty",
                                                    tag: "p",
                                                    className: "timeline-subtitle"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                    lineNumber: 214,
                                                    columnNumber: 33
                                                }, this),
                                                exp.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "job-details",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: exp.description,
                                                            onChange: (val)=>updateExperience(exp.id, 'description', val),
                                                            placeholder: "Mô tả công việc...",
                                                            tag: "span",
                                                            multiline: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                            lineNumber: 224,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                        lineNumber: 223,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                    lineNumber: 222,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "remove-btn-inline",
                                                    onClick: ()=>removeExperience(exp.id),
                                                    title: "Xóa",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-icons",
                                                        children: "close"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                        lineNumber: 239,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                    lineNumber: 234,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, exp.id, true, {
                                            fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                            lineNumber: 189,
                                            columnNumber: 29
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                lineNumber: 181,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "section-title",
                                        children: [
                                            "Học vấn",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "add-btn-inline",
                                                onClick: addEducation,
                                                title: "Thêm học vấn",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-icons",
                                                    children: "add"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                    lineNumber: 250,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                lineNumber: 249,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                        lineNumber: 247,
                                        columnNumber: 25
                                    }, this),
                                    cvData.educations?.map((edu)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "timeline-item",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "timeline-header",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: edu.degree,
                                                            onChange: (val)=>updateEducation(edu.id, 'degree', val),
                                                            placeholder: "Bằng cấp",
                                                            tag: "h4",
                                                            className: "timeline-title"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                            lineNumber: 256,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "timeline-date",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    value: edu.startYear,
                                                                    onChange: (val)=>updateEducation(edu.id, 'startYear', val),
                                                                    placeholder: "YYYY",
                                                                    tag: "span"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                                    lineNumber: 264,
                                                                    columnNumber: 41
                                                                }, this),
                                                                ' - ',
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    value: edu.endYear || 'Nay',
                                                                    onChange: (val)=>updateEducation(edu.id, 'endYear', val),
                                                                    placeholder: "YYYY",
                                                                    tag: "span"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                                    lineNumber: 271,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                            lineNumber: 263,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                    lineNumber: 255,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: edu.institution,
                                                    onChange: (val)=>updateEducation(edu.id, 'institution', val),
                                                    placeholder: "Trường/Tổ chức",
                                                    tag: "p",
                                                    className: "timeline-subtitle"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                    lineNumber: 279,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "remove-btn-inline",
                                                    onClick: ()=>removeEducation(edu.id),
                                                    title: "Xóa",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "material-icons",
                                                        children: "close"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                        lineNumber: 291,
                                                        columnNumber: 37
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                    lineNumber: 286,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, edu.id, true, {
                                            fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                            lineNumber: 254,
                                            columnNumber: 29
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                lineNumber: 246,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                        lineNumber: 179,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: {
                            marginTop: '40px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "section-title",
                                children: [
                                    "Kỹ năng",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "add-btn-inline",
                                        onClick: addSkill,
                                        title: "Thêm kỹ năng",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-icons",
                                            children: "add"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                            lineNumber: 303,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                        lineNumber: 302,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                lineNumber: 300,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "skills-container",
                                children: cvData.skills?.map((skill, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `skill-tag ${index < 5 ? 'skill-primary' : 'skill-secondary'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                value: skill.name,
                                                onChange: (val)=>updateSkill(skill.id, 'name', val),
                                                placeholder: "Tên kỹ năng",
                                                tag: "span"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                lineNumber: 309,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "remove-skill-btn",
                                                onClick: ()=>removeSkill(skill.id),
                                                title: "Xóa",
                                                children: "×"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                                lineNumber: 315,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, skill.id, true, {
                                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                        lineNumber: 308,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                                lineNumber: 306,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                        lineNumber: 299,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
                lineNumber: 163,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LiveCV/templates/ModernTemplate.jsx",
        lineNumber: 108,
        columnNumber: 9
    }, this);
}
_c = ModernTemplate;
const __TURBOPACK__default__export__ = ModernTemplate;
var _c;
__turbopack_context__.k.register(_c, "ModernTemplate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LiveCV/templates/FormalTemplate.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LiveCV/EditableField.jsx [app-client] (ecmascript)");
;
;
;
function FormalTemplate({ cvData, onUpdate }) {
    const updatePersonalInfo = (field, value)=>{
        onUpdate({
            ...cvData,
            personalInfo: {
                ...cvData.personalInfo,
                [field]: value
            }
        });
    };
    const updateExperience = (id, field, value)=>{
        onUpdate({
            ...cvData,
            experiences: cvData.experiences.map((exp)=>exp.id === id ? {
                    ...exp,
                    [field]: value
                } : exp)
        });
    };
    const addExperience = ()=>{
        onUpdate({
            ...cvData,
            experiences: [
                ...cvData.experiences,
                {
                    id: Date.now(),
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: ''
                }
            ]
        });
    };
    const removeExperience = (id)=>{
        onUpdate({
            ...cvData,
            experiences: cvData.experiences.filter((exp)=>exp.id !== id)
        });
    };
    const updateEducation = (id, field, value)=>{
        onUpdate({
            ...cvData,
            educations: cvData.educations.map((edu)=>edu.id === id ? {
                    ...edu,
                    [field]: value
                } : edu)
        });
    };
    const addEducation = ()=>{
        onUpdate({
            ...cvData,
            educations: [
                ...cvData.educations,
                {
                    id: Date.now(),
                    institution: '',
                    degree: '',
                    fieldOfStudy: '',
                    startYear: '',
                    endYear: ''
                }
            ]
        });
    };
    const removeEducation = (id)=>{
        onUpdate({
            ...cvData,
            educations: cvData.educations.filter((edu)=>edu.id !== id)
        });
    };
    const updateSkill = (id, field, value)=>{
        onUpdate({
            ...cvData,
            skills: cvData.skills.map((skill)=>skill.id === id ? {
                    ...skill,
                    [field]: value
                } : skill)
        });
    };
    const addSkill = ()=>{
        onUpdate({
            ...cvData,
            skills: [
                ...cvData.skills,
                {
                    id: Date.now(),
                    name: '',
                    level: ''
                }
            ]
        });
    };
    const removeSkill = (id)=>{
        onUpdate({
            ...cvData,
            skills: cvData.skills.filter((skill)=>skill.id !== id)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "formal-cv-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "formal-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: cvData.personalInfo?.fullName,
                                onChange: (val)=>updatePersonalInfo('fullName', val),
                                placeholder: "Họ và Tên",
                                tag: "h1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 112,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: cvData.personalInfo?.position || cvData.experiences?.[0]?.position,
                                onChange: (val)=>updatePersonalInfo('position', val),
                                placeholder: "Vị trí ứng tuyển",
                                tag: "h2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 118,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                        lineNumber: 111,
                        columnNumber: 17
                    }, this),
                    cvData.personalInfo?.avatarBase64 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: `data:image/png;base64,${cvData.personalInfo.avatarBase64}`,
                        alt: "Profile",
                        className: "profile-img"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                        lineNumber: 126,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                lineNumber: 110,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "contact-bar",
                children: [
                    cvData.personalInfo?.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "contact-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-icons",
                                children: "email"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 138,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: cvData.personalInfo?.email,
                                onChange: (val)=>updatePersonalInfo('email', val),
                                placeholder: "email@example.com",
                                tag: "span"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 139,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                        lineNumber: 137,
                        columnNumber: 21
                    }, this),
                    cvData.personalInfo?.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "contact-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-icons",
                                children: "phone"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 149,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: cvData.personalInfo?.phone,
                                onChange: (val)=>updatePersonalInfo('phone', val),
                                placeholder: "0123 456 789",
                                tag: "span"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 150,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                        lineNumber: 148,
                        columnNumber: 21
                    }, this),
                    cvData.personalInfo?.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "contact-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "material-icons",
                                children: "home"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 160,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: cvData.personalInfo?.address,
                                onChange: (val)=>updatePersonalInfo('address', val),
                                placeholder: "Địa chỉ",
                                tag: "span"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 161,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                        lineNumber: 159,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                lineNumber: 135,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "formal-main",
                children: [
                    cvData.personalInfo?.summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "section-title",
                                children: "TÓM TẮT"
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 176,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                value: cvData.personalInfo?.summary,
                                onChange: (val)=>updatePersonalInfo('summary', val),
                                placeholder: "Mô tả ngắn gọn về bản thân...",
                                tag: "p",
                                multiline: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 177,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                        lineNumber: 175,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "section-title",
                                children: [
                                    "KINH NGHIỆM LÀM VIỆC",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "add-btn-inline",
                                        onClick: addExperience,
                                        title: "Thêm kinh nghiệm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-icons",
                                            children: "add"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                            lineNumber: 192,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                        lineNumber: 191,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 189,
                                columnNumber: 21
                            }, this),
                            cvData.experiences?.map((exp, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "formal-item",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "item-header",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: exp.position,
                                                            onChange: (val)=>updateExperience(exp.id, 'position', val),
                                                            placeholder: "Vị trí",
                                                            tag: "h4",
                                                            className: "item-title"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                            lineNumber: 199,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: exp.company,
                                                            onChange: (val)=>updateExperience(exp.id, 'company', val),
                                                            placeholder: "Tên công ty",
                                                            tag: "p",
                                                            className: "item-subtitle"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                            lineNumber: 206,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                    lineNumber: 198,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "item-date",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: exp.startDate,
                                                            onChange: (val)=>updateExperience(exp.id, 'startDate', val),
                                                            placeholder: "MM/YYYY",
                                                            tag: "span"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                            lineNumber: 215,
                                                            columnNumber: 37
                                                        }, this),
                                                        ' - ',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: exp.endDate || 'Hiện tại',
                                                            onChange: (val)=>updateExperience(exp.id, 'endDate', val),
                                                            placeholder: "MM/YYYY",
                                                            tag: "span"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                            lineNumber: 222,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                    lineNumber: 214,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                            lineNumber: 197,
                                            columnNumber: 29
                                        }, this),
                                        exp.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            value: exp.description,
                                            onChange: (val)=>updateExperience(exp.id, 'description', val),
                                            placeholder: "Mô tả công việc...",
                                            tag: "p",
                                            className: "item-description",
                                            multiline: true
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                            lineNumber: 231,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "remove-btn-inline",
                                            onClick: ()=>removeExperience(exp.id),
                                            title: "Xóa",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-icons",
                                                children: "close"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                lineNumber: 245,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                            lineNumber: 240,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, exp.id || index, true, {
                                    fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                    lineNumber: 196,
                                    columnNumber: 25
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                        lineNumber: 188,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "section-title",
                                children: [
                                    "HỌC VẤN",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "add-btn-inline",
                                        onClick: addEducation,
                                        title: "Thêm học vấn",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-icons",
                                            children: "add"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                            lineNumber: 256,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                        lineNumber: 255,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 253,
                                columnNumber: 21
                            }, this),
                            cvData.educations?.map((edu, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "formal-item",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "item-header",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: edu.degree,
                                                            onChange: (val)=>updateEducation(edu.id, 'degree', val),
                                                            placeholder: "Bằng cấp",
                                                            tag: "h4",
                                                            className: "item-title"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                            lineNumber: 263,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: edu.institution,
                                                            onChange: (val)=>updateEducation(edu.id, 'institution', val),
                                                            placeholder: "Trường/Tổ chức",
                                                            tag: "p",
                                                            className: "item-subtitle"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                            lineNumber: 270,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                    lineNumber: 262,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "item-date",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: edu.startYear,
                                                            onChange: (val)=>updateEducation(edu.id, 'startYear', val),
                                                            placeholder: "YYYY",
                                                            tag: "span"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                            lineNumber: 279,
                                                            columnNumber: 37
                                                        }, this),
                                                        ' - ',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            value: edu.endYear || 'Nay',
                                                            onChange: (val)=>updateEducation(edu.id, 'endYear', val),
                                                            placeholder: "YYYY",
                                                            tag: "span"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                            lineNumber: 286,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                    lineNumber: 278,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                            lineNumber: 261,
                                            columnNumber: 29
                                        }, this),
                                        edu.fieldOfStudy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "item-description",
                                            children: [
                                                "Chuyên ngành: ",
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    value: edu.fieldOfStudy,
                                                    onChange: (val)=>updateEducation(edu.id, 'fieldOfStudy', val),
                                                    placeholder: "Chuyên ngành",
                                                    tag: "span"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                    lineNumber: 297,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                            lineNumber: 295,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "remove-btn-inline",
                                            onClick: ()=>removeEducation(edu.id),
                                            title: "Xóa",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-icons",
                                                children: "close"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                lineNumber: 310,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                            lineNumber: 305,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, edu.id || index, true, {
                                    fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                    lineNumber: 260,
                                    columnNumber: 25
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                        lineNumber: 252,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "section-title",
                                children: [
                                    "KỸ NĂNG",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "add-btn-inline",
                                        onClick: addSkill,
                                        title: "Thêm kỹ năng",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "material-icons",
                                            children: "add"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                            lineNumber: 321,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                        lineNumber: 320,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 318,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "skills-list",
                                children: cvData.skills?.map((skill, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "skill-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                value: skill.name,
                                                onChange: (val)=>updateSkill(skill.id, 'name', val),
                                                placeholder: "Tên kỹ năng",
                                                tag: "span"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                lineNumber: 327,
                                                columnNumber: 33
                                            }, this),
                                            skill.level && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "skill-level",
                                                children: [
                                                    ' - ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$EditableField$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        value: skill.level,
                                                        onChange: (val)=>updateSkill(skill.id, 'level', val),
                                                        placeholder: "Mức độ",
                                                        tag: "span"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                        lineNumber: 336,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                lineNumber: 334,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "remove-skill-btn",
                                                onClick: ()=>removeSkill(skill.id),
                                                title: "Xóa",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "material-icons",
                                                    children: "close"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                    lineNumber: 349,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                                lineNumber: 344,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, skill.id || index, true, {
                                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                        lineNumber: 326,
                                        columnNumber: 29
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                                lineNumber: 324,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                        lineNumber: 317,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
                lineNumber: 172,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LiveCV/templates/FormalTemplate.jsx",
        lineNumber: 108,
        columnNumber: 9
    }, this);
}
_c = FormalTemplate;
const __TURBOPACK__default__export__ = FormalTemplate;
var _c;
__turbopack_context__.k.register(_c, "FormalTemplate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LiveCV/HistorySidebar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$cvApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/cvApi.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const HistorySidebar = ({ onSelectCV, currentCvId, isOpen, onClose, onDeleteSuccess })=>{
    _s();
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HistorySidebar.useEffect": ()=>{
            if (isOpen) {
                fetchHistory();
            }
        }
    }["HistorySidebar.useEffect"], [
        isOpen,
        currentCvId
    ]); // Refetch when opened or when current CV changes (saved)
    const fetchHistory = async ()=>{
        try {
            setIsLoading(true);
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$cvApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCVHistory"])();
            // Ensure we have an array
            const data = Array.isArray(response) ? response : response.data || [];
            // Sort by updated date desc
            const sortedData = data.sort((a, b)=>new Date(b.updatedAt) - new Date(a.updatedAt));
            setHistory(sortedData);
        } catch (error) {
            console.error('Error fetching history:', error);
            setHistory([]);
        } finally{
            setIsLoading(false);
        }
    };
    const handleDelete = async (e, id)=>{
        e.stopPropagation();
        if (window.confirm('Bạn có chắc chắn muốn xóa CV này?')) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$cvApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteCV"])(id);
                fetchHistory(); // Refresh list
                if (onDeleteSuccess) {
                    onDeleteSuccess(id);
                }
            } catch (error) {
                console.error('Error deleting CV:', error);
                alert('Không thể xóa CV. Vui lòng thử lại.');
            }
        }
    };
    const formatDate = (dateString)=>{
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `history-sidebar ${isOpen ? 'open' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sidebar-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Lịch sử CV"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn-close-sidebar",
                        onClick: onClose,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "material-icons",
                            children: "close"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                            lineNumber: 66,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                        lineNumber: 65,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                lineNumber: 63,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sidebar-content",
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sidebar-loading",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "spinner-border spinner-border-sm text-primary",
                            role: "status"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                            lineNumber: 73,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Đang tải..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                            lineNumber: 74,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                    lineNumber: 72,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sidebar-empty",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Chưa có CV nào được lưu."
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                        lineNumber: 78,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                    lineNumber: 77,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "history-list",
                    children: history.map((cv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: `history-item ${currentCvId === cv.id ? 'active' : ''}`,
                            onClick: ()=>onSelectCV(cv.id),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "history-item-content",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "history-title",
                                            children: cv.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                                            lineNumber: 89,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "history-date",
                                            children: formatDate(cv.updatedAt)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                                            lineNumber: 90,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "history-template-badge",
                                            children: cv.templateType
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                                            lineNumber: 91,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                                    lineNumber: 88,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn-delete-history",
                                    onClick: (e)=>handleDelete(e, cv.id),
                                    title: "Xóa CV",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "delete"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                                        lineNumber: 98,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                                    lineNumber: 93,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, cv.id, true, {
                            fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                            lineNumber: 83,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                    lineNumber: 81,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
                lineNumber: 70,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LiveCV/HistorySidebar.jsx",
        lineNumber: 62,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(HistorySidebar, "sIu7C0d2PM/VDrOM3YN6d3aTvMg=");
_c = HistorySidebar;
const __TURBOPACK__default__export__ = HistorySidebar;
var _c;
__turbopack_context__.k.register(_c, "HistorySidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/LiveCV/LiveCVBuilder.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-4WY6JWTD.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/toast-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$templateApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/templateApi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$cvApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/cvApi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$templates$2f$ProfessionalTemplate$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LiveCV/templates/ProfessionalTemplate.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$templates$2f$ModernTemplate$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LiveCV/templates/ModernTemplate.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$templates$2f$FormalTemplate$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LiveCV/templates/FormalTemplate.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$HistorySidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LiveCV/HistorySidebar.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
;
function LiveCVBuilder() {
    _s();
    const [templates, setTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingTemplates, setIsLoadingTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showTemplateSelection, setShowTemplateSelection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExporting, setIsExporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSaveDialog, setShowSaveDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSidebarOpen, setIsSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [cvTitle, setCvTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentCvId, setCurrentCvId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [searchParams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToastContext"])();
    const initialCvData = {
        templateType: 'professional',
        personalInfo: {
            fullName: 'Nguyễn Quỳnh Như',
            position: 'Quản lý nhà hàng',
            email: 'nhu.nguyen@example.com',
            phone: '0987 654 321',
            address: '123 Đường ABC, Quận 1, TP.HCM',
            summary: 'Tôi là một quản lý nhà hàng có kinh nghiệm với hơn 5 năm làm việc trong ngành F&B. Tôi có khả năng quản lý đội ngũ nhân viên, kiểm soát chi phí và nâng cao trải nghiệm khách hàng.',
            avatarBase64: null,
            website: ''
        },
        experiences: [
            {
                id: 1,
                company: 'Nhà hàng ABC',
                position: 'Quản lý',
                startDate: '01/2020',
                endDate: '12/2023',
                description: 'Quản lý hoạt động hàng ngày của nhà hàng, đào tạo nhân viên mới, kiểm soát chi phí và đảm bảo chất lượng dịch vụ.'
            }
        ],
        educations: [
            {
                id: 1,
                institution: 'Đại học Kinh tế TP.HCM',
                degree: 'Cử nhân',
                fieldOfStudy: 'Quản trị Nhà hàng & Dịch vụ Ăn uống',
                startYear: '2016',
                endYear: '2020'
            }
        ],
        skills: [
            {
                id: 1,
                name: 'Quản lý nhân sự',
                level: 'Thành thạo'
            },
            {
                id: 2,
                name: 'Dịch vụ khách hàng',
                level: 'Chuyên gia'
            },
            {
                id: 3,
                name: 'Quản lý chi phí',
                level: 'Thành thạo'
            }
        ]
    };
    const [cvData, setCvData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCvData);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveCVBuilder.useEffect": ()=>{
            const fetchTemplates = {
                "LiveCVBuilder.useEffect.fetchTemplates": async ()=>{
                    try {
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$templateApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTemplates"])();
                        setTemplates(data);
                        // Check for ID in URL
                        const cvId = searchParams.get('id');
                        if (cvId) {
                            await loadCVFromHistory(cvId);
                        } else if ("TURBOPACK compile-time truthy", 1) {
                            const savedCvData = localStorage.getItem('liveCvData');
                            if (savedCvData) {
                                const parsedData = JSON.parse(savedCvData);
                                setCvData(parsedData);
                            }
                        }
                    } catch (error) {
                        console.error('Lỗi khi tải mẫu CV:', error);
                    } finally{
                        setIsLoadingTemplates(false);
                    }
                }
            }["LiveCVBuilder.useEffect.fetchTemplates"];
            fetchTemplates();
        }
    }["LiveCVBuilder.useEffect"], [
        searchParams
    ]);
    const loadCVFromHistory = async (id)=>{
        try {
            const savedCV = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$cvApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCVById"])(id);
            if (savedCV) {
                setCvData(savedCV.cvData);
                setCvTitle(savedCV.title);
                setCurrentCvId(savedCV.id);
            }
        } catch (error) {
            console.error('Error loading CV:', error);
            toast.error('Không thể tải CV từ lịch sử.');
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveCVBuilder.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && currentCvId === 0) {
                localStorage.setItem('liveCvData', JSON.stringify(cvData));
            }
        }
    }["LiveCVBuilder.useEffect"], [
        cvData,
        currentCvId
    ]);
    const handleUpdate = (newCvData)=>{
        setCvData(newCvData);
    };
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Kích thước ảnh không được vượt quá 2MB');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = ()=>{
            const base64String = reader.result.split(',')[1];
            setCvData((prev)=>({
                    ...prev,
                    personalInfo: {
                        ...prev.personalInfo,
                        avatarBase64: base64String
                    }
                }));
        };
        reader.readAsDataURL(file);
    };
    const saveCvToBackend = async (titleToUse)=>{
        // Helper to parse MM/YYYY to ISO Date
        const parseDate = (dateStr)=>{
            if (!dateStr) return new Date().toISOString();
            if (dateStr.includes('/')) {
                const [month, year] = dateStr.split('/');
                return new Date(parseInt(year), parseInt(month) - 1, 1).toISOString();
            }
            // If it's already an ISO string or other format, try to parse it
            const date = new Date(dateStr);
            return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
        };
        // Prepare data for backend - Remove IDs from sub-objects as they are not in DTOs
        const formattedCvData = {
            ...cvData,
            experiences: cvData.experiences.map(({ id, ...exp })=>({
                    ...exp,
                    startDate: parseDate(exp.startDate),
                    endDate: exp.endDate && exp.endDate.toLowerCase() !== 'hiện tại' ? parseDate(exp.endDate) : null
                })),
            educations: cvData.educations.map(({ id, ...edu })=>({
                    ...edu,
                    startYear: parseInt(edu.startYear) || new Date().getFullYear(),
                    endYear: edu.endYear && !isNaN(parseInt(edu.endYear)) ? parseInt(edu.endYear) : null
                })),
            skills: cvData.skills.map(({ id, ...skill })=>({
                    name: skill.name,
                    level: skill.level
                }))
        };
        console.log('Saving CV Data:', formattedCvData);
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$cvApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveCV"])({
            id: currentCvId,
            title: titleToUse,
            templateType: cvData.templateType,
            cvData: formattedCvData
        });
    };
    const handleSaveCV = async ()=>{
        if (!cvTitle.trim()) {
            toast.warning('Vui lòng nhập tên cho CV của bạn');
            return;
        }
        try {
            const result = await saveCvToBackend(cvTitle);
            setCurrentCvId(result.id);
            toast.success('CV đã được lưu thành công!');
            setShowSaveDialog(false);
            // Update URL without reloading
            if (currentCvId === 0) {
                navigate(`/cv-builder?id=${result.id}`, {
                    replace: true
                });
            }
        } catch (error) {
            console.error('Error saving CV:', error);
            if (error.response) {
                console.error('Server Error Details:', error.response.data);
                toast.error(`Lỗi lưu CV: ${error.response.data.message || 'Dữ liệu không hợp lệ'}`);
            } else {
                toast.error('Không thể lưu CV. Vui lòng thử lại.');
            }
        }
    };
    const handleExportPdf = async ()=>{
        try {
            setIsExporting(true);
            if (!cvData.personalInfo.fullName || !cvData.personalInfo.email) {
                toast.warning('Vui lòng điền đầy đủ thông tin bắt buộc (Họ tên và Email)');
                return;
            }
            // Auto-save before export
            try {
                const titleToSave = cvTitle || `CV ${cvData.personalInfo.fullName}`;
                const result = await saveCvToBackend(titleToSave);
                // Update state if it was a new CV
                if (currentCvId === 0) {
                    setCurrentCvId(result.id);
                    setCvTitle(titleToSave);
                    navigate(`/cv-builder?id=${result.id}`, {
                        replace: true
                    });
                }
            } catch (saveError) {
                console.error('Auto-save failed:', saveError);
            // Continue with export even if save fails
            }
            const parseDate = (dateStr)=>{
                if (!dateStr) return null;
                if (dateStr.includes('/')) {
                    const [month, year] = dateStr.split('/');
                    return new Date(parseInt(year), parseInt(month) - 1, 1).toISOString();
                }
                return new Date(dateStr).toISOString();
            };
            const exportData = {
                templateType: cvData.templateType,
                personalInfo: {
                    fullName: cvData.personalInfo.fullName,
                    email: cvData.personalInfo.email,
                    phone: cvData.personalInfo.phone,
                    address: cvData.personalInfo.address,
                    summary: cvData.personalInfo.summary,
                    avatarBase64: cvData.personalInfo.avatarBase64 || '',
                    position: cvData.personalInfo.position,
                    website: cvData.personalInfo.website
                },
                experiences: cvData.experiences.map((exp)=>({
                        company: exp.company,
                        position: exp.position,
                        startDate: parseDate(exp.startDate),
                        endDate: exp.endDate ? parseDate(exp.endDate) : null,
                        description: exp.description
                    })),
                educations: cvData.educations.map((edu)=>({
                        institution: edu.institution,
                        degree: edu.degree,
                        fieldOfStudy: edu.fieldOfStudy,
                        startYear: parseInt(edu.startYear) || null,
                        endYear: parseInt(edu.endYear) || null
                    })),
                skills: cvData.skills.map((skill)=>({
                        name: skill.name,
                        level: skill.level
                    }))
            };
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$templateApi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exportCvPdf"])(exportData);
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([
                response
            ]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `CV_${cvData.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Lỗi khi xuất PDF:', error);
            toast.error('Có lỗi xảy ra khi xuất PDF. Vui lòng thử lại.');
        } finally{
            setIsExporting(false);
        }
    };
    const handleSelectTemplate = (templateKey)=>{
        setCvData((prev)=>({
                ...prev,
                templateType: templateKey
            }));
        setShowTemplateSelection(false);
    };
    const handleBackToTemplates = ()=>{
        setShowTemplateSelection(true);
    };
    const handleCreateNewCV = ()=>{
        if (window.confirm('Bạn có chắc chắn muốn tạo CV mới? Các thay đổi chưa lưu sẽ bị mất.')) {
            setCvData(initialCvData);
            setCvTitle('');
            setCurrentCvId(0);
            navigate('/cv-builder'); // Clear ID from URL
        }
    };
    const handleCvDeleted = (deletedId)=>{
        if (deletedId === currentCvId) {
            setCvData(initialCvData);
            setCvTitle('');
            setCurrentCvId(0);
            navigate('/cv-builder');
        }
    };
    if (showTemplateSelection) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "template-selection-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-center mb-4",
                    children: "Chọn Mẫu CV"
                }, void 0, false, {
                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                    lineNumber: 331,
                    columnNumber: 17
                }, this),
                isLoadingTemplates ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "loading-state",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "spinner-border text-primary",
                            role: "status",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "visually-hidden",
                                children: "Đang tải..."
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                lineNumber: 335,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                            lineNumber: 334,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Đang tải danh sách mẫu CV..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                            lineNumber: 337,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                    lineNumber: 333,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "template-grid",
                    children: templates.map((template)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "template-card",
                            onClick: ()=>handleSelectTemplate(template.key),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card-body",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                        className: "card-title",
                                        children: template.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 348,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "card-description",
                                        children: template.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 349,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn btn-primary",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            handleSelectTemplate(template.key);
                                        },
                                        children: "Chọn mẫu này"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 350,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                lineNumber: 347,
                                columnNumber: 33
                            }, this)
                        }, template.id, false, {
                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                            lineNumber: 342,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                    lineNumber: 340,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
            lineNumber: 330,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "live-cv-builder",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$HistorySidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isSidebarOpen,
                onClose: ()=>setIsSidebarOpen(false),
                onSelectCV: (id)=>{
                    loadCVFromHistory(id);
                    setIsSidebarOpen(false);
                },
                currentCvId: currentCvId,
                onDeleteSuccess: handleCvDeleted
            }, void 0, false, {
                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                lineNumber: 370,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "toolbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "toolbar-left",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-outline",
                                    onClick: ()=>navigate('/my-cvs'),
                                    title: "Quay về trang chủ",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "arrow_back"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 389,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                    lineNumber: 384,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-outline",
                                    onClick: ()=>setIsSidebarOpen(true),
                                    title: "Lịch sử CV",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "history"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 396,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                    lineNumber: 391,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "toolbar-title",
                                            children: "CV Builder"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                            lineNumber: 399,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "toolbar-subtitle",
                                            children: "Click vào bất kỳ đâu để chỉnh sửa"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                            lineNumber: 400,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                    lineNumber: 398,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                            lineNumber: 383,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                        lineNumber: 382,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "toolbar-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                accept: "image/*",
                                onChange: handleImageChange,
                                style: {
                                    display: 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                lineNumber: 405,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-outline",
                                onClick: ()=>fileInputRef.current?.click(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "photo_camera"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 416,
                                        columnNumber: 25
                                    }, this),
                                    "Đổi ảnh"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                lineNumber: 412,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-outline",
                                onClick: handleCreateNewCV,
                                title: "Tạo CV mới",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "add_circle_outline"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 424,
                                        columnNumber: 25
                                    }, this),
                                    "Tạo mới"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                lineNumber: 419,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-outline",
                                onClick: handleBackToTemplates,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 431,
                                        columnNumber: 25
                                    }, this),
                                    "Đổi mẫu"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                lineNumber: 427,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-secondary",
                                onClick: ()=>{
                                    setCvTitle(cvTitle || `CV ${cvData.personalInfo.fullName}`);
                                    setShowSaveDialog(true);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "save"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 441,
                                        columnNumber: 25
                                    }, this),
                                    "Lưu CV"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                lineNumber: 434,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary",
                                onClick: handleExportPdf,
                                disabled: isExporting,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "material-icons",
                                        children: "picture_as_pdf"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 449,
                                        columnNumber: 25
                                    }, this),
                                    isExporting ? 'Đang xuất...' : 'Xuất PDF'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                lineNumber: 444,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                        lineNumber: 404,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                lineNumber: 381,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cv-editor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "cv-paper",
                    children: [
                        cvData.templateType === 'professional' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$templates$2f$ProfessionalTemplate$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            cvData: cvData,
                            onUpdate: handleUpdate
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                            lineNumber: 458,
                            columnNumber: 25
                        }, this),
                        cvData.templateType === 'modern' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$templates$2f$ModernTemplate$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            cvData: cvData,
                            onUpdate: handleUpdate
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                            lineNumber: 464,
                            columnNumber: 25
                        }, this),
                        cvData.templateType === 'formal' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$templates$2f$FormalTemplate$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            cvData: cvData,
                            onUpdate: handleUpdate
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                            lineNumber: 470,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                    lineNumber: 456,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                lineNumber: 455,
                columnNumber: 13
            }, this),
            showSaveDialog && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
                onClick: ()=>setShowSaveDialog(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-md rounded-xl bg-white p-6 shadow-2xl ring-1 ring-gray-200",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex items-center gap-2 text-xl font-bold text-gray-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "material-icons text-primary",
                                    children: "save"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                    lineNumber: 483,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "Lưu CV"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                    lineNumber: 484,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                            lineNumber: 482,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-sm font-medium text-gray-700",
                                        children: "Tên CV:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 488,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "text",
                                        value: cvTitle,
                                        onChange: (e)=>setCvTitle(e.target.value),
                                        placeholder: "Ví dụ: CV Quản lý nhà hàng",
                                        className: "w-full",
                                        autoFocus: true,
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') handleSaveCV();
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                        lineNumber: 489,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                lineNumber: 487,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                            lineNumber: 486,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setShowSaveDialog(false),
                                    children: "Hủy"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                    lineNumber: 503,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleSaveCV,
                                    children: "Lưu CV"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                                    lineNumber: 506,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                            lineNumber: 502,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                    lineNumber: 481,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
                lineNumber: 480,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LiveCV/LiveCVBuilder.jsx",
        lineNumber: 369,
        columnNumber: 9
    }, this);
}
_s(LiveCVBuilder, "9T2SGWnRTEcJ8ZWF7u5lqMgjH9Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$toast$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToastContext"]
    ];
});
_c = LiveCVBuilder;
const __TURBOPACK__default__export__ = LiveCVBuilder;
var _c;
__turbopack_context__.k.register(_c, "LiveCVBuilder");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/routes/app-router.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appRouter",
    ()=>appRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-4WY6JWTD.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$main$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/main-layout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$dashboard$2f$dashboard$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/dashboard/dashboard-page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$my$2d$cvs$2f$my$2d$cvs$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/my-cvs/my-cvs-page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$jd$2d$analyzer$2f$jd$2d$analyzer$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/jd-analyzer/jd-analyzer-page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$ai$2d$rewrite$2f$ai$2d$rewrite$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/ai-rewrite/ai-rewrite-page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$export$2f$export$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/export/export-page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$settings$2f$settings$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/settings/settings-page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$jobs$2f$job$2d$search$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/jobs/job-search-page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$jobs$2f$post$2d$job$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/jobs/post-job-page.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$LiveCVBuilder$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LiveCV/LiveCVBuilder.jsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
const appRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$4WY6JWTD$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserRouter"])([
    {
        path: '/',
        element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$main$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MainLayout"], {}, void 0, false, {
            fileName: "[project]/routes/app-router.tsx",
            lineNumber: 16,
            columnNumber: 14
        }, ("TURBOPACK compile-time value", void 0)),
        children: [
            {
                index: true,
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$dashboard$2f$dashboard$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardPage"], {}, void 0, false, {
                    fileName: "[project]/routes/app-router.tsx",
                    lineNumber: 18,
                    columnNumber: 31
                }, ("TURBOPACK compile-time value", void 0))
            },
            {
                path: 'dashboard',
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$dashboard$2f$dashboard$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardPage"], {}, void 0, false, {
                    fileName: "[project]/routes/app-router.tsx",
                    lineNumber: 19,
                    columnNumber: 37
                }, ("TURBOPACK compile-time value", void 0))
            },
            {
                path: 'my-cvs',
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$my$2d$cvs$2f$my$2d$cvs$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MyCVsPage"], {}, void 0, false, {
                    fileName: "[project]/routes/app-router.tsx",
                    lineNumber: 20,
                    columnNumber: 34
                }, ("TURBOPACK compile-time value", void 0))
            },
            {
                path: 'jd-analyzer',
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$jd$2d$analyzer$2f$jd$2d$analyzer$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JDAnalyzerPage"], {}, void 0, false, {
                    fileName: "[project]/routes/app-router.tsx",
                    lineNumber: 21,
                    columnNumber: 39
                }, ("TURBOPACK compile-time value", void 0))
            },
            {
                path: 'ai-rewrite',
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$ai$2d$rewrite$2f$ai$2d$rewrite$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AIRewritePage"], {}, void 0, false, {
                    fileName: "[project]/routes/app-router.tsx",
                    lineNumber: 22,
                    columnNumber: 38
                }, ("TURBOPACK compile-time value", void 0))
            },
            {
                path: 'export',
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$export$2f$export$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExportPage"], {}, void 0, false, {
                    fileName: "[project]/routes/app-router.tsx",
                    lineNumber: 23,
                    columnNumber: 34
                }, ("TURBOPACK compile-time value", void 0))
            },
            {
                path: 'settings',
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$settings$2f$settings$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SettingsPage"], {}, void 0, false, {
                    fileName: "[project]/routes/app-router.tsx",
                    lineNumber: 24,
                    columnNumber: 36
                }, ("TURBOPACK compile-time value", void 0))
            },
            {
                path: 'jobs',
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$jobs$2f$job$2d$search$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JobSearchPage"], {}, void 0, false, {
                    fileName: "[project]/routes/app-router.tsx",
                    lineNumber: 25,
                    columnNumber: 32
                }, ("TURBOPACK compile-time value", void 0))
            },
            {
                path: 'post-job',
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$jobs$2f$post$2d$job$2d$page$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PostJobPage"], {}, void 0, false, {
                    fileName: "[project]/routes/app-router.tsx",
                    lineNumber: 26,
                    columnNumber: 36
                }, ("TURBOPACK compile-time value", void 0))
            }
        ]
    },
    {
        path: '/cv-builder',
        element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LiveCV$2f$LiveCVBuilder$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/routes/app-router.tsx",
            lineNumber: 31,
            columnNumber: 14
        }, ("TURBOPACK compile-time value", void 0))
    }
]);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$dom$2d$export$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/dom-export.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$routes$2f$app$2d$router$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/routes/app-router.tsx [app-client] (ecmascript)");
'use client';
;
;
;
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$dom$2d$export$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RouterProvider"], {
        router: __TURBOPACK__imported__module__$5b$project$5d2f$routes$2f$app$2d$router$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appRouter"]
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_2864feeb._.js.map