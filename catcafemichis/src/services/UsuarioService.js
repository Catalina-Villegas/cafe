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
        // credentials = { usuario: correo, password: contrasenia }
        return api.post('/auth/login', credentials);
    }
}
export default new UsuarioService();