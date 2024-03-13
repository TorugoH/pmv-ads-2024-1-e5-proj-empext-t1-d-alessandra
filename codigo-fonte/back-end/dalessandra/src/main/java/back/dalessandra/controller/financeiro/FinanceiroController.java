package back.dalessandra.controller.financeiro;
import back.dalessandra.Model.Financeiro;
import back.dalessandra.service.financeiro.FinanceiroService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/financeiro")
@RequiredArgsConstructor
public class FinanceiroController {

    private final FinanceiroService financeiroService;

    @GetMapping
    public List<Financeiro> findAll() {
        return financeiroService.findAll();
    }

    @GetMapping("/{idDespesa}")
    public Financeiro findByidDespesa(@PathVariable Integer idDespesa) {
        return financeiroService.findByidDespesa(idDespesa).orElse(null);
    }

    @GetMapping("/{tipoDespesa}")
    public Financeiro findBytipoDespesa(@PathVariable String tipoDespesa) {
        return financeiroService.findBytipoDespesa(tipoDespesa).orElse(null);
    }

    @PostMapping
    public Financeiro cadastrarDespesa(@RequestBody Financeiro financeiro) {
        return financeiroService.cadastrarDespesa(financeiro);
    }


    @DeleteMapping("{idDespesa}")
    public String excluirDespesa(@PathVariable("idDespesa") int idDespesa){
        return financeiroService.excluirDespesa(idDespesa);
    }

}