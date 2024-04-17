package back.dalessandra.service.estoque;

import back.dalessandra.Model.Estoque;
import back.dalessandra.repository.estoque.EstoqueRepository;
import back.dalessandra.service.envioEmail.EmailEnvio;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EstoqueService {
    @Autowired
    EstoqueRepository estoqueRepository;
    EmailEnvio emaiEnvio =new EmailEnvio();
    public void cadastrarEstoque(Estoque estoque){
        int qtdAtual = estoque.getQuantidadeItem();
        float valorComprado = estoque.getValorComprado();
        float valorAvender = estoque.getValorVenda();
        estoque.setQtdAtual(qtdAtual);
        estoque.setValorTotalEmEstoque(valorComprado*qtdAtual);
        estoque.setValorTotalAVender(valorAvender*qtdAtual);
        estoque.setStatus("Bom");
        estoqueRepository.save(estoque);
    }
    public Page<Estoque> listarEstoque(int numeroPagina, int tamanhoPagina){
        PageRequest pageRequest = PageRequest.of(numeroPagina, tamanhoPagina);
        return estoqueRepository.findAll(pageRequest);
    }

    public String excluirProdutoEstoque(int id){
        estoqueRepository.deleteById(id);
        return ("Excluido com sucesso");
    }

    public List<Estoque> recuperarNivelBaixo(){
        return estoqueRepository.verificarItemsCriticos();
    }


}
