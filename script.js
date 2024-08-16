function calcularImpressao() {
    var numFolhas = parseInt(document.getElementById('numFolhas').value);
    var nomeItem = document.getElementById('nomeItem').value;
    var valorPB = 0.25;
    var valorColorido = 0.50;
    var valorEncadernacao = 8.00;

    var totalPB = numFolhas * valorPB + valorEncadernacao;
    var totalColorido = numFolhas * valorColorido + valorEncadernacao;

    var resultadoHTML = "<div class='resultado'>";
    resultadoHTML += "<p><strong>" + nomeItem + "</strong></p>";
    resultadoHTML += "<p>Quantidade de Páginas: " + numFolhas + "</p>";
    resultadoHTML += "<p>Impressão Preto e Branco: R$ " + totalPB.toFixed(2) + "</p>";
    resultadoHTML += "<p>Impressão Colorida: R$ " + totalColorido.toFixed(2) + "</p>";
    resultadoHTML += "</div>";

    document.getElementById('resultado').innerHTML = resultadoHTML;
}

function gerarPDF() {
    console.log("Botão de gerar PDF clicado.");

    var doc = new jsPDF();
    var nomeItem = document.getElementById('nomeItem').value;
    var numFolhas = parseInt(document.getElementById('numFolhas').value);
    var valorPB = 0.25;
    var valorColorido = 0.50;
    var valorEncadernacao = 8.00;

    console.log("Valores capturados: nomeItem:", nomeItem, "numFolhas:", numFolhas);

    var totalPB = numFolhas * valorPB;
    var totalColorido = numFolhas * valorColorido;

    // Calcula o valor total incluindo a encadernação
    var totalComEncadernacaoPB = totalPB + valorEncadernacao;
    var totalComEncadernacaoColorido = totalColorido + valorEncadernacao;

    var margemEsquerda = 10; // Margem esquerda
    var linhaAtual = 50; // Início da primeira linha, ajustado para deixar mais espaço para a logo

    // Adiciona a logo ao PDF (supondo que a logo esteja disponível no mesmo diretório e seja um PNG)
    var logo = new Image();
    logo.src = 'LOGO PNG.png';
    logo.onload = function() {
        doc.addImage(logo, 'PNG', 80, 10, 50, 20); // Ajuste as dimensões conforme necessário

        // Adiciona um título ao PDF
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Detalhes da Impressão", margemEsquerda, linhaAtual);
        linhaAtual += 10;

        // Desenha uma linha abaixo do título
        doc.setLineWidth(0.5);
        doc.line(margemEsquerda, linhaAtual, 200, linhaAtual);
        linhaAtual += 10;

        // Adiciona as informações ao PDF
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');

        // Informações detalhadas
        doc.text("Apostila de " + nomeItem, margemEsquerda, linhaAtual);
        linhaAtual += 10;
        doc.text("Quantidade de Páginas: " + numFolhas, margemEsquerda, linhaAtual);
        linhaAtual += 10;

        // Destaque para os valores
        doc.setFont('helvetica', 'bold');
        doc.text("Valores:", margemEsquerda, linhaAtual);
        linhaAtual += 10;

        doc.setFont('helvetica', 'normal');
        doc.text("Impressão Preto e Branco: R$ " + totalComEncadernacaoPB.toFixed(2), margemEsquerda, linhaAtual);
        linhaAtual += 10;
        doc.text("Impressão Colorida: R$ " + totalComEncadernacaoColorido.toFixed(2), margemEsquerda, linhaAtual);
        linhaAtual += 10;

        // Adiciona uma caixa ao redor das informações de custo
        var rectX = margemEsquerda - 5;
        var rectY = linhaAtual - 26;
        var rectWidth = 190;
        var rectHeight = 30;

        doc.setDrawColor(0, 123, 255); // Azul
        doc.setLineWidth(1);
        doc.rect(rectX, rectY, rectWidth, rectHeight);

        // Salva o PDF
        doc.save('impressao.pdf');

        console.log("PDF gerado com sucesso.");
    };
}
