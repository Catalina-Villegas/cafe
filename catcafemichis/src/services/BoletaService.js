import api from './AxiosConfig'; 


class BoletaService {
    
    getAllBoletas() {
        return api.get('/boletas'); 
    }

    createBoleta(boleta) {
        return api.post('/boletas', boleta);
    }

    getBoletaById(id) {
        return api.get(`/boletas/${id}`);
    }

    updatePBoleta(id, boleta) {
        return api.put(`/boletas/${id}`, boleta);
    }

    deleteBoleta(id) {
        return api.delete(`/boletas/${id}`);
    }

    getDetalleBoleta(id){
        return api.get(`/detalleBoleta/${id}`);
    }
}
export default new BoletaService();