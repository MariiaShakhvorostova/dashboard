document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".customers__search");
  const tableBody = document.querySelector("#customers-table");
  const navLinks = document.querySelectorAll(".sidebar__nav__link");
  const sidebar = document.querySelector(".sidebar");
  const main = document.querySelector(".main");
  const partLogo = document.querySelector(".part-logo");
  const mainTitle = document.querySelector(".main__title");
  const customers = document.querySelector(".customers");

  function renderTable(customers) {
    tableBody.innerHTML = "";
    customers.forEach((customer) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${customer.name}</td>
          <td>${customer.company}</td>
          <td>${customer.phone}</td>
          <td>${customer.email}</td>
          <td>${customer.country}</td>
          <td class="${
            customer.status.toLowerCase() === "active"
              ? "status-active"
              : "status-inactive"
          }"></td>
        `;
      tableBody.appendChild(row);
    });
  }

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      renderTable(data);
      searchInput.addEventListener("input", function (e) {
        const query = e.target.value.toLowerCase();
        const filteredCustomers = data.filter(
          (customer) =>
            customer.name.toLowerCase().includes(query) ||
            customer.company.toLowerCase().includes(query) ||
            customer.phone.includes(query) ||
            customer.email.toLowerCase().includes(query) ||
            customer.country.toLowerCase().includes(query) ||
            customer.status.toLowerCase().includes(query)
        );
        renderTable(filteredCustomers);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));

  navLinks.forEach((link) => {
    link.addEventListener("mouseover", function () {
      link.classList.add("sidebar__nav__link--active");
    });
    link.addEventListener("mouseout", function () {
      link.classList.remove("sidebar__nav__link--active");
    });
  });

  function toggleSidebar() {
    sidebar.classList.add("sidebar--hidden");
    main.classList.add("main--expanded");
    partLogo.classList.add("part-logo--visible");
    if (main.classList.contains("main--expanded")) {
      mainTitle.style.textAlign = "center";
    } else {
      mainTitle.style.textAlign = "";
    }
  }

  main.addEventListener("click", function (event) {
    if (!customers.contains(event.target)) {
      toggleSidebar();
    }
  });

  partLogo.addEventListener("click", function () {
    main.classList.remove("main--expanded");
    sidebar.classList.remove("sidebar--hidden");
    partLogo.classList.remove("part-logo--visible");
    mainTitle.style.textAlign = "";
  });
});
