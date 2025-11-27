function cadastro() {
    
    const entradaNome = document.getElementById("nome");
    const entradaEmail = document.getElementById("email");
    
    const nome = entradaNome.value.trim(); 
    const email = entradaEmail.value.trim();

    
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    
    if (nome === "" && email === "") {
        alert("Ambos os campos não foram preenchidos");
        return;
    } 
    else if (nome === "") {
        alert("Campo de nome não foi preenchido");
        return;
    } 
    else if (email === "") {
        alert("Campo de email não foi preenchido");
        return;
    }

    
    if (!emailValido.test(email)) {
        alert("Digite um e-mail válido (ex: teste@teste.com).");
        return;
    }

    
    let listaCadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    
    const emailJaExiste = listaCadastros.some(item => item.email === email);

    if (emailJaExiste) {
        alert("Este e-mail já está cadastrado.");
        return; 
    }

    
    let novoUsuario = {
        data: dataFormatada,
        nome: nome,
        email: email
    };

    listaCadastros.push(novoUsuario); 
    localStorage.setItem('cadastros', JSON.stringify(listaCadastros)); 

    
    alert("Cadastro realizado com sucesso!");
    entradaNome.value = "";
    entradaEmail.value = "";
    
}

function excluir() {
   
    const entradaNome = document.getElementById("nome");
    const entradaEmail = document.getElementById("email");
    
    const nome = entradaNome.value.trim();
    const email = entradaEmail.value.trim();

    
    let listaCadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

   
    if (listaCadastros.length === 0) {
        alert("Não há registros para excluir.");
        return;
    }

  
    if (nome === "" && email === "") {
        alert("Para excluir, preencha o E-mail ou o Nome do usuário.");
        return;
    }

   
    let indiceEncontrado = -1;

    
    if (email !== "") {
        
        indiceEncontrado = listaCadastros.findIndex(cadastro => cadastro.email === email);
        
        if (indiceEncontrado === -1) {
            alert("Nenhum cadastro encontrado com esse E-mail.");
            return;
        }
    } 
   
    else if (nome !== "") {
        indiceEncontrado = listaCadastros.findIndex(cadastro => cadastro.nome === nome);
        
        if (indiceEncontrado === -1) {
            alert("Nenhum cadastro encontrado com esse Nome.");
            return;
        }
    }

    
    const usuarioRemovido = listaCadastros[indiceEncontrado];
    
    
    const confirmacao = confirm(`Tem certeza que deseja excluir: ${usuarioRemovido.nome} (${usuarioRemovido.email})?`);

    if (confirmacao) {
        
        listaCadastros.splice(indiceEncontrado, 1);

        
        localStorage.setItem('cadastros', JSON.stringify(listaCadastros));

        alert("Cadastro excluído com sucesso!");
        
       
        entradaNome.value = "";
        entradaEmail.value = "";

       
    }
}

function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}



function consultar() {
    const lista = document.getElementById("listaCadastros");
    if (!lista) return;

    const pesquisaInput = document.getElementById("pesquisa");
    const filtro = pesquisaInput ? pesquisaInput.value.trim().toLowerCase() : "";

    let listaCadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    lista.innerHTML = "";

    listaCadastros.forEach(function(item, index) {
        if (filtro &&
            !item.nome.toLowerCase().includes(filtro) &&
            !item.email.toLowerCase().includes(filtro)) {
            return;
        }

        const li = document.createElement("li");
        li.innerHTML = `
            <span class="cadastro-data">${item.data}</span> — 
            <strong>${item.nome}</strong> — 
            <span class="cadastro-email">${item.email}</span>
            <button type="button" onclick="excluirPorIndice(${index})">Excluir</button>
        `;
        lista.appendChild(li);
    });

    if (lista.children.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Nenhum cadastro encontrado.";
        lista.appendChild(li);
    }
}

function excluirPorIndice(index) {
    let listaCadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    if (index < 0 || index >= listaCadastros.length) return;

    const usuarioRemovido = listaCadastros[index];
    const confirmacao = confirm(`Tem certeza que deseja excluir: ${usuarioRemovido.nome} (${usuarioRemovido.email})?`);
    if (!confirmacao) return;

    listaCadastros.splice(index, 1);
    localStorage.setItem('cadastros', JSON.stringify(listaCadastros));

    consultar();
}

function excluirTodos() {
    let listaCadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    if (listaCadastros.length === 0) {
        alert("Não há registros para excluir.");
        return;
    }

    const confirmacao = confirm("Tem certeza que deseja excluir TODOS os cadastros?");
    if (!confirmacao) return;

    localStorage.removeItem('cadastros');
    consultar();
}

window.addEventListener("load", consultar);
