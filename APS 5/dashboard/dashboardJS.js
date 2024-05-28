
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawCharts);

  function drawCharts() {
    fetch("../resultados.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            drawBarChart(data);
            drawPieChart(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
  }

function drawBarChart(data) {
    var dataArray = [['Restaurante', 'Porcentagem']];
    data.forEach(function (item) {
        dataArray.push([item.restaurante, item.porcentagem_consumo]);
    });

    var dataTable = google.visualization.arrayToDataTable(dataArray);

    var options = {
        title: "Porcentagem de Consumo de Lixo por Restaurante",
        bar: { groupWidth: '95%' },
        legend: { position: 'none' },
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('grafico1'));
    chart.draw(dataTable, options);
}

  function drawPieChart(data) {
      var dataArray = [['Restaurante', 'Lixeiras Adicionais']];
      data.forEach(function (item) {
          dataArray.push([item.restaurante, item.lixeiras_adicionais]);
      });

      var dataTable = google.visualization.arrayToDataTable(dataArray);

      var options = {
          title: 'Lixeiras Adicionais por Restaurante',
      };

      var chart = new google.visualization.PieChart(document.getElementById('grafico2'));
      chart.draw(dataTable, options);
  }

