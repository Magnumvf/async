const tableContent = document.getElementById("tableContent");
const btnAdd = document.getElementById("addClient");
const url = "https://65949aeb1493b011606aad77.mockapi.io/clientes";

const newClient = {
  name: "Teste mock",
  email: "teste mock e-mail",
  phone: "teste mock phone"
};

async function fetchClients() { //busca as informações da API acima (url)
  const response = await fetch(url); //trás uma resposta da API, se foi bem sucedida ou não
  const data = await response.json(); //transforma nossa resposta em json como objeto
  return data; //retorna a informação
}
async function fetchClient(id){
  const response = await fetch(`${url}/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
}
async function createUser(client){
  const response = await fetch(url, {
    method: 'POST',
    headers: {"Content-type":"application/json; charset=UTF-8"},
    body: JSON.stringify(client),
  });
}

async function deleteClient(id){ // deleta um client especifico (através do ID) 
 await fetch(`${url}/${id}` , { method: "DELETE"}); //especifica url da API (endpoint), o id e o metodo que vai ser utilizado (no caso, delete)
 await renderClientList();
}

function createRowTable(client){
  const row = `
  <tr>
      <td class="body-cell">${client.name}</td>
      <td class="body-cell">${client.email}</td>
      <td class="body-cell">${client.telefone}</td>
      <td class="body-cell actions">
          <div class="actions-buttons">
              <button class="edit" onclick="fetchClient(${client.id})">Editar</button>
              <button class="delete" onclick="deleteClient(${client.id})">Excluir</button>
          </div>
      </td>
  </tr>
  `;
  return row;
}

async function renderClientList() { //renderiza a lista de clientes
    tableContent.innerHTML = ""; //reinicia a tabela em innerHTML sempre que chama a função
    const clients = await fetchClients(); //guarda o data da função fetchClients na constante clients
  clients.map((client) => { //para cada cliente (map),faz iteração entre os objetos
    const clientRow =  (tableContent.innerHTML += createRowTable(client));
        return clientRow;
  });
}
window.addEventListener("load", async () => {
  
  await renderClientList();
});

btnAdd.addEventListener("click", () => createUser(newClient));