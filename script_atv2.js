var arquivo_json = [
    { "codProduto": 1234,
      "descricao": "Computador Dell Inspiron XS 12000 8Gb RAM 1 TB HD Intel i5 4g NVidia 1080",
      "preco": 3500.00,
      "qtdEstoque": 14,
      "disponivel": "sim",
      "emDestaque": "sim",
      "departamento" : {
      "idDepto": 987,
      "nomeDepto":"Informatica e acessórios"
      }
    },
    { "codProduto": 1235,
    "descricao": "Computador Dualcore 2gb de ram",
    "preco": 2500.00,
    "qtdEstoque": 975,
    "disponivel": "não",
    "emDestaque": "sim",
    "departamento" : {
    "idDepto": 987,
    "nomeDepto":"Informatica e acessórios"
    }
  },
  { "codProduto": 1236,
  "descricao": "Computador Dell Inspiron XS 12000 8Gb RAM 1 TB HD Intel i5 4g NVidia 1080",
  "preco": 1500.00,
  "qtdEstoque": 320,
  "disponivel": "sim",
  "emDestaque": "não",
  "departamento" : {
  "idDepto": 987,
  "nomeDepto":"Informatica"
  }
}
 ]






//Função Quantidade total de itens em estoque (somatória das quantidades de todos os produtos)
function get_qtdEstoque(arquivo_json){
    var result = 0
    var produtos = arquivo_json
    for(var i=0;i<produtos.length;i++){
        result += produtos[i]["qtdEstoque"]*1
    }
    return result
}

//Função quantidade total de itens em destaque (somatória das quantidades dos itens marcados como "emDestaque : sim")
function get_qntdestaque(arquivo_json){
    var produtos = arquivo_json
    var result = 0
    for (var i =0; i<produtos.length;i++){
        if (produtos[i]["emDestaque"] === "sim"){
        result += result+

        }
    }
    return result
    
}

//Função quantidade total de itens disponíveis (similar ao anterior)
function get_itens_disponiveis(arquivo_json){
    var produtos = arquivo_json
    var result = 0
    for (var i =0; i<produtos.length; i++){
        if (produtos[i]["disponivel"] === "sim"){
            result += 1
        }
    }
    return result
}

//Função valor total do inventário da empresa (somatória dos valores individuais multiplicado pela quantidade em estoque)
function get_invetario_empresa(arquivo_json){
    var produtos = arquivo_json
    var result = 0
    for (var i = 0; i < produtos.length; i++){
        result += produtos[i].preco*produtos[i]["qtdEstoque"]
    }
    return result
}

//Função somatória de itens por departamento (você deverá retornar um objeto contendo o nome do departamento e o total de itens nele)
function get_itens_departamento(arquivo_json){
    var dados = arquivo_json
    var departamentos = []
    var estoques = []
    var obj =[]
    function contador_de_estoque(departamentos, dados){
	    var result = 0
	    for(var j =0; j< dados.length;j++){
		    if (departamentos === dados[j].departamento.nomeDepto){
		    result += dados[j].qtdEstoque*1
		    }
		    else{
			    continue
		    }
	    }
	    return result
    }
    for(var i = 0; i < dados.length; i++){
	    departamentos.push(dados[i].departamento.nomeDepto)
    }
    departamentos = departamentos.filter((value,index) => departamentos.indexOf(value) === index)

    for (var k = 0; k <departamentos.length; k++){
	    estoques.push(contador_de_estoque(departamentos[k],dados))
    }
    for (var i = 0; i < departamentos.length;i++){
    var keys = ["departamentos", "estoque"];
    var values = [departamentos[i], estoques[i]]
    var result = {};
    keys.forEach((key, i) => result[key] = values[i]);
    obj.push(result)
	
}
    return obj

}

//Função Valor total do inventário por departamento (similar ao item anterior)
function get_inventario_departamentos(arquivo_json){
    var dados = arquivo_json
    var departamentos = []
    var inventário = []
    var obj = []
    function contador_de_invetário(departamentos, dados){
	    var result = 0
	    for(var j =0; j< dados.length;j++){
		    if (departamentos === dados[j].departamento.nomeDepto){
		    result += dados[j].qtdEstoque*dados[j].preco*1
		    }
		    else{
			    continue
		    }
	    }
	    return result
    }
    for(var i = 0; i < dados.length; i++){
	    departamentos.push(dados[i].departamento.nomeDepto)
    }
    departamentos = departamentos.filter((value,index) => departamentos.indexOf(value) === index)

    for (var k = 0; k <departamentos.length; k++){
	    inventário.push(contador_de_invetário(departamentos[k],dados))
    }
    for (var i = 0; i < departamentos.length;i++){
        var keys = ["departamentos", "inventário"];
        var values = [departamentos[i], inventário[i]]
        var result = {};
        keys.forEach((key, i) => result[key] = values[i]);
        obj.push(result)
        
    }
        return obj
}

//Função Valor do ticket médio dos produtos da empresa (basicamente o valor total do inventário dividido pelo número de itens)
function get_ticket_médio_empresa(arquivo_json){
    var dados = arquivo_json
    return get_invetario_empresa(dados)/get_qtdEstoque(dados)
}

//Função Ticket médio por departamento (similar ao item anterior, porém retornando uma lista de objetos que contenha o nome do departamento e o seu ticket médio)
function get_ticket_médio_departamentos(arquivo_json){
    var dados = arquivo_json
    var invetários = []
    var departamentos = []
    var estoques = []
    var ticket = []
    var obj = []
    
    for(var i = 0; i < dados.length; i++){
        departamentos.push(dados[i].departamento.nomeDepto)
    }
    departamentos = departamentos.filter((value,index) => departamentos.indexOf(value) === index)
    for(var i = 0; i < departamentos.length; i++){
    
    invetários.push(get_inventario_departamentos(dados)[i].inventário)
    estoques.push(get_itens_departamento(dados)[i].estoque)
    }
    var ticket = []
    for(var i = 0; i<departamentos.length; i++){
    ticket.push(invetários[i]*1/estoques[i]*1)
    var keys = ["departamentos", "ticket"];
    var values = [departamentos[i], ticket[i]]
    var result = {};
    keys.forEach((key, i) => result[key] = values[i]);
    obj.push(result)
    }  
    return obj
}

//Função Departamento mais valioso (qual o departamento que tem a maior somatória dos valores dos itens)
function get_mostvalued_departamento(arquivo_json){
    var dados = arquivo_json
    function contador_de_invetário(departamentos, dados){
        var result = 0
        for(var j =0; j< dados.length;j++){
            if (departamentos === dados[j].departamento.nomeDepto){
            result += dados[j].qtdEstoque*dados[j].preco*1
            }
            else{
                continue
            }
        }
        return result
    }
    var inventário = []
    var departamentos = []
    var comparison = 0
    for(var i = 0; i < dados.length; i++){
	    departamentos.push(dados[i].departamento.nomeDepto)
    }
    departamentos = departamentos.filter((value,index) => departamentos.indexOf(value) === index)

    for (var k = 0; k <departamentos.length; k++){
	    inventário.push(contador_de_invetário(departamentos[k],dados))
    }   
    for(var i = 0; i < inventário[i]; i++){
        if (inventário[i] > comparison){
            comparison = inventário[i]
        }
        else{
            continue
        }
    }
    var result =  departamentos[inventário.indexOf(comparison)]
console.log(result)
}

//Função Produto mais caro da loja (bem como seu departamento)
function get_highest_price_iten(arquivo_json){
    var dados = arquivo_json
    var comparison = 0
    for(var i =0; i < dados.length; i++){
        if(dados[i].preco > comparison){
            comparison = dados[i].preco
        }
        else{
            continue
        }
    }
    return comparison
}

//Função Produto mais barato da loja (bem como seu departamento)
function get_lowest_price_iten(arquivo_json){
    var dados = arquivo_json
    var comparison = dados[0].preco
    for(var i =0; i < dados.length; i++){
        if(dados[i].preco < comparison){
            comparison = dados[i].preco
        }
        else{
            continue
        }
    }
    return comparison
}



