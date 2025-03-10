document.addEventListener("DOMContentLoaded", () => {
    const dataTable = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    const addRowButton = document.getElementById("addRow");

    // Load data from localStorage
    loadData();

    // Add new row
    addRowButton.addEventListener("click", () => {
        const newRow = {
            nim: "000000000",
            nama: "Nama Baru",
            kelas: "Kelas A",
            prodi: "Prodi X",
            alamat: "Alamat Baru"
        };
        addRow(newRow);
    });

    function loadData() {
        const data = JSON.parse(localStorage.getItem("kawanData")) || [];
        data.forEach((item, index) => {
            addRow(item, index + 1);
        });
    }

    function addRow(data, index) {
        const row = dataTable.insertRow();
        row.insertCell(0).innerText = index || dataTable.rows.length; // No
        row.insertCell(1).innerText = data.nim; // NIM
        row.insertCell(2).innerText = data.nama; // Nama
        row.insertCell(3).innerText = data.kelas; // Kelas
        row.insertCell(4).innerText = data.prodi; // Prodi
        row.insertCell(5).innerText = data.alamat; // Alamat
    
        const actionCell = row.insertCell(6);
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            dataTable.deleteRow(row.rowIndex - 1);
            saveData();
        });
        actionCell.appendChild(deleteButton);
    
        // Make cells editable
        for (let i = 1; i < row.cells.length - 1; i++) {
            row.cells[i].addEventListener("dblclick", () => {
                const originalValue = row.cells[i].innerText;
                const input = document.createElement("input");
                input.value = originalValue;
                row.cells[i].innerText = "";
                row.cells[i].appendChild(input);
                input.focus();
    
                const okButton = document.createElement("button");
                okButton.innerText = "OK";
                const cancelButton = document.createElement("button");
                cancelButton.innerText = "Cancel";
    
                row.cells[i].appendChild(okButton);
                row.cells[i].appendChild(cancelButton);
    
                okButton.addEventListener("click", () => {
                    const newValue = input.value;
                    if (i === 1) { // NIM
                        if (!/^\d{9}$/.test(newValue)) {
                            alert("NIM harus 9 digit angka!");
                            input.value = originalValue; // Reset to original value
                        } else {
                            row.cells[i].innerText = newValue;
                            saveData();
                        }
                    } else if (i === 2 && !/^[A-Za-z\s]+$/.test(newValue)) { // Nama
                        alert("Nama hanya boleh huruf A-Z!");
                        input.value = originalValue; // Reset to original value
                    } else {
                        row.cells[i].innerText = newValue;
                        saveData();
                    }
                    okButton.remove();
                    cancelButton.remove();
                });
    
                cancelButton.addEventListener("click", () => {
                    row.cells[i].innerText = originalValue; // Reset to original value
                    okButton.remove();
                    cancelButton.remove();
                });
            });
        }
    }
    
    function saveData() {
        const rows = dataTable.rows;
        const data = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            data.push({
                nim: row.cells[1].innerText,
                nama: row.cells[2].innerText,
                kelas: row.cells[3].innerText,
                prodi: row.cells[4].innerText,
                alamat: row.cells[5].innerText
            });
        }
        localStorage.setItem("kawanData", JSON.stringify(data));
    }
});