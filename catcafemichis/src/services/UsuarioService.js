import api from './AxiosConfig'; 

class UsuarioService {
    
    getAllUsuarios() {
        return api.get('/usuarios'); 
    }

    createUsuario(usuario) {
        return api.post('/usuarios', usuario);
    }

    getUsuarioById(id) {
        return api.get(`/usuarios/${id}`);
    }

    updateUsuario(id, usuario) {
        return api.put(`/usuarios/${id}`, usuario);
    }

    deleteUsuario(id) {
        return api.delete(`/usuarios/${id}`);
    }

    login(credentials) {
        return api.post('/auth/login', credentials);
    }

    registrar(usuario) {
        return api.post('/usuarios', usuario);
    }
    
}
export default new UsuarioService();
