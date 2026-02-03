// ============================================
// 🔐 RaoniX Platform - Auth System
// ============================================
// Supabase Authentication Helper
// Usage: Include this file in all protected pages

// ✅ CREDENCIAIS SUPABASE (Configurado)
const SUPABASE_URL = 'https://sjhhnzmqafkbodjakzdz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_x6zS8GIZfTo_hvqjcBLcWA_qhEJMtFa';

// Importar Supabase Client (via CDN)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Inicializar cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// 🔒 CHECK AUTH - Protege páginas
// ============================================
async function checkAuth() {
    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (!session) {
            // Não autenticado - redirecionar para login
            const currentPage = window.location.pathname;
            window.location.href = `/login.html?redirect=${encodeURIComponent(currentPage)}`;
            return null;
        }
        
        // Autenticado - retornar dados do usuário
        return session.user;
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        window.location.href = '/login.html';
        return null;
    }
}

// ============================================
// 🚪 LOGIN COM EMAIL/SENHA
// ============================================
async function signInWithEmail(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        
        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================
// 📝 SIGNUP COM EMAIL/SENHA
// ============================================
async function signUpWithEmail(email, password, fullName = '') {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });
        
        if (error) throw error;
        
        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================
// 🔵 LOGIN COM GOOGLE OAUTH
// ============================================
async function signInWithGoogle() {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/index.html` // Redirect após login
            }
        });
        
        if (error) throw error;
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ============================================
// 🚪 LOGOUT
// ============================================
async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}

// ============================================
// 👤 GET CURRENT USER
// ============================================
async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) throw error;
        
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}

// ============================================
// 🔄 ON AUTH STATE CHANGE (Listener)
// ============================================
function onAuthStateChange(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

// ============================================
// EXPORTAR FUNÇÕES
// ============================================
export {
    supabase,
    checkAuth,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    getCurrentUser,
    onAuthStateChange
};
