package back.dalessandra.service.cliente;

import back.dalessandra.repository.cliente.ClienteDevedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteDevedorService {

    @Autowired
    ClienteDevedorRepository clienteDevedorRepository;

    public List<?> listarClientesDevedor(){
        return  clienteDevedorRepository.listarCLientesDevedores();
    }

}