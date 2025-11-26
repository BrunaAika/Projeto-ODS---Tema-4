function cadastro() {
    // 1. Pegar os inputs do HTML
    const entradaNome = document.getElementById("nome");
    const entradaEmail = document.getElementById("email");
    
    const nome = entradaNome.value.trim(); // .trim() remove espaços inúteis no começo/fim
    const email = entradaEmail.value.trim();

    // 2. Configurações (Regex e Data)
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regra para validar email
    
    const dataAtual = new Date();
    // Adicionei padStart para garantir que dia 5 vire "05"
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // 3. Verificações de campos vazios (Lógica do seu exemplo)
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

    // 4. Validação se o email é real
    if (!emailValido.test(email)) {
        alert("Digite um e-mail válido (ex: teste@teste.com).");
        return;
    }

    // 5. Lógica do Local Storage
    // Tenta pegar a lista 'cadastros'. Se não existir, cria uma lista vazia []
    let listaCadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    // Verifica se JÁ EXISTE alguém com esse email na lista
    const emailJaExiste = listaCadastros.some(item => item.email === email);

    if (emailJaExiste) {
        alert("Este e-mail já está cadastrado.");
        return; 
    }

    // 6. Criar o objeto único e salvar
    let novoUsuario = {
        data: dataFormatada,
        nome: nome,
        email: email
    };

    listaCadastros.push(novoUsuario); // Adiciona na lista
    localStorage.setItem('cadastros', JSON.stringify(listaCadastros)); // Salva no navegador

    // 7. Feedback e Limpeza
    alert("Cadastro realizado com sucesso!");
    entradaNome.value = "";
    entradaEmail.value = "";
    
    // Se você tiver a função consultar, pode chamar ela aqui para atualizar a tabela na hora
    // consultar(); 
}

function excluir() {
    // 1. Pegar os inputs
    const entradaNome = document.getElementById("nome");
    const entradaEmail = document.getElementById("email");
    
    const nome = entradaNome.value.trim();
    const email = entradaEmail.value.trim();

    // 2. Pegar a lista do LocalStorage
    let listaCadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

    // Verificação básica se a lista está vazia
    if (listaCadastros.length === 0) {
        alert("Não há registros para excluir.");
        return;
    }

    // 3. Validação: O usuário precisa digitar algo para sabermos quem excluir
    if (nome === "" && email === "") {
        alert("Para excluir, preencha o E-mail ou o Nome do usuário.");
        return;
    }

    // Variável para guardar a posição do item que vamos apagar
    let indiceEncontrado = -1;

    // --- ESTRATÉGIA DE BUSCA ---
    
    // CASO 1: Se o usuário digitou o EMAIL (Mais seguro, pois é único)
    if (email !== "") {
        // findIndex procura item por item. Retorna a posição (0, 1, 2...) ou -1 se não achar
        indiceEncontrado = listaCadastros.findIndex(cadastro => cadastro.email === email);
        
        if (indiceEncontrado === -1) {
            alert("Nenhum cadastro encontrado com esse E-mail.");
            return;
        }
    } 
    // CASO 2: Se não tem email, tenta pelo NOME
    else if (nome !== "") {
        indiceEncontrado = listaCadastros.findIndex(cadastro => cadastro.nome === nome);
        
        if (indiceEncontrado === -1) {
            alert("Nenhum cadastro encontrado com esse Nome.");
            return;
        }
    }

    // 4. Executar a exclusão
    // Guarda os dados de quem será excluido só para mostrar no alert
    const usuarioRemovido = listaCadastros[indiceEncontrado];
    
    // O confirmação é opcional, mas recomendada
    const confirmacao = confirm(`Tem certeza que deseja excluir: ${usuarioRemovido.nome} (${usuarioRemovido.email})?`);

    if (confirmacao) {
        // Remove 1 item na posição encontrada
        listaCadastros.splice(indiceEncontrado, 1);

        // 5. Salvar a nova lista atualizada no LocalStorage
        localStorage.setItem('cadastros', JSON.stringify(listaCadastros));

        alert("Cadastro excluído com sucesso!");
        
        // Limpa os campos
        entradaNome.value = "";
        entradaEmail.value = "";

        // Se tiver a função de consultar/tabela, atualize ela aqui:
        // consultar(); 
    }
}

function limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}