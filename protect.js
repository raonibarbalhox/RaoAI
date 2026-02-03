// ============================================
// 🛡️ RaoniX Platform - Page Protection Helper
// ============================================
// Proteção seletiva: Define quais páginas são públicas vs protegidas

import { checkAuth } from './auth.js';

// ============================================
// 📋 PÁGINAS PÚBLICAS (sem login necessário)
// ============================================
const PUBLIC_PAGES = [
    '/portfolio.html',
    '/cv.html',
    '/login.html',
    '/index.html' // Hub público (mostra apenas cards públicos)
];

// ============================================
// 🔒 PROTEGER PÁGINA ATUAL
// ============================================
async function protectPage() {
    const currentPath = window.location.pathname;
    
    // Se for página pública, permitir acesso
    if (PUBLIC_PAGES.some(page => currentPath.endsWith(page) || currentPath === '/' || currentPath === '')) {
        return true;
    }
    
    // Página protegida - verificar autenticação
    const user = await checkAuth();
    
    if (!user) {
        // Não autenticado - redirecionar para login
        return false;
    }
    
    // Autenticado - permitir acesso
    return true;
}

// ============================================
// 👤 GET USER INFO (se autenticado)
// ============================================
async function getUserInfo() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return null;
    
    return {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata.full_name || session.user.email.split('@')[0],
        avatar: session.user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${session.user.email}&background=0070f3&color=fff`
    };
}

export { protectPage, getUserInfo, PUBLIC_PAGES };
