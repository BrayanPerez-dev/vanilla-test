// JS Code here...
const form = document.getElementById("product-form");
const id = document.getElementById("id");
const table = document.getElementById("products-table");
const deleteBtn = document.getElementsByClassName("btn-delete");
let data = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let iva = 0.21;
  if (e.target[0].value == "" || e.target[1].value == "") {
    return;
  }

  if (e.target[2].value != "") {
    iva = e.target[2].value;
  }

  if (e.target[2].value) {
    iva = parseFloat(e.target[2].value) / 100;
  }

  const total =
    parseFloat(e.target[1].value) +
    parseFloat(e.target[1].value) * parseFloat(iva);
  const obj = {
    id: Math.floor(Math.random() * 999),
    product: e.target[0].value,
    price: e.target[1].value,
    iva,
    total,
    date: new Date().toLocaleDateString("en-US"),
  };

  saveData(obj);
});

const saveData = (obj) => {
  data.push(obj);

  console.log(data);

  printData();
};

const printData = () => {
  data.forEach((item) => {
    const newRow = table.insertRow();

    const id = newRow.insertCell();
    const product = newRow.insertCell();
    const price = newRow.insertCell();
    const iva = newRow.insertCell();
    const total = newRow.insertCell();
    const date = newRow.insertCell();

    id.textContent = item.id;
    product.textContent = item.product;
    price.textContent = "$" + item.price;
    iva.textContent = item.iva + "%";
    total.textContent = "$" + item.total;
    date.textContent = item.date;

    const deleteCell = newRow.insertCell();
    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    btnDelete.classList.add("btn", "btn-delete");
    deleteCell.appendChild(btnDelete);
    btnDelete.addEventListener("click", (e) => {
        e.preventDefault()
        const row = e.target.parentNode.parentNode;
        const id = row.cells[0].textContent;
        if (confirm("¿Estás seguro de querer eliminar este registro?")) {
            newData = data.filter((item) => item.id != id);
            data = newData;
            console.log(data);
            while (table.rows.length > 1) {
              table.deleteRow(1);
            }
            printData();
          }
        
    });
  });
};
