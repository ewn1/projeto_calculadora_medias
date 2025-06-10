const form = document.getElementById('form-atividade'); //'form-atividade é o ID do formulário
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
const atividades = []; //array para receber todos dados das atividades digitados
const notas = []; //array para receber todos dados das notas digitados
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));


/*foi criado abaixo o evento de submissão do formulário 
e removemos o comportamento de atualizar a tela ao submeter a informação com function(e)*/

let linhas = ''; //foi colocada no escopo global antes do evento(e) para não sumir a linha da tabela

form.addEventListener('submit', function(e) { 
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) { //criado para nao deixar repetir atividade
        alert(`A atividade: ${inputNomeAtividade.value} ja foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; //utilizamos operador ternário, o '?' significa IF e o ':' o ELSE
        linha += '</tr>';

        linhas += linha;
    }

    inputNomeAtividade.value = ''; //para limpar o campo após digitar atividade
    inputNotaAtividade.value = ''; //para limpar o campo após digitar a nota
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody'); //coloca o conteúdo dentro do corpo da tabela
    corpoTabela.innerHTML = linhas; //insere o conteúdo dentro da tag
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal(); //aqui é preciso externalizar o resultado para o HTML, precisa de um ID na coluna td onde mostra a nota final

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); //toFixed foi utilizado para renderizar o resultado e limitar a dizima periódica à 2 digitos apenas
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i]; //estrutura de repetição, contagem dos dados
    }

    return somaDasNotas / notas.length;
}