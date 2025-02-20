import ITransaction from "@/interfaces/ITransaction";
import formatDateToBR from "@/utils/formatDateToBR";
import generateID from "@/utils/generateID";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  pdf
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

export default function exportPdf(formattedTransactions: ITransaction[]) {
  console.log("Dentro do exportPdf");
  const fileName = `transacoes_${formatDateToBR(new Date())}_${generateID()}.pdf`;

  // Definindo os estilos
  const styles = StyleSheet.create({
    page: { padding: 30 },
    header: { fontSize: 18, textAlign: "center", marginBottom: 20 },
    table: { marginTop: 20 },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      marginBottom: 5
    },
    tableCell: { flex: 1, padding: 5, fontSize: 10 },
    tableCellHeader: { fontWeight: "bold" }
  });

  // Criando o documento PDF com a estrutura
  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>Relatório de Transações</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>ID</Text>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>Tipo</Text>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>
              Valor
            </Text>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>
              Categoria
            </Text>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>
              Usuário
            </Text>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>
              Criado em
            </Text>
            <Text style={[styles.tableCell, styles.tableCellHeader]}>
              Excluído em
            </Text>
          </View>

          {formattedTransactions.map((t: ITransaction, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell]}>{t.id}</Text>
              <Text style={[styles.tableCell]}>{t.type}</Text>
              <Text style={[styles.tableCell]}>R$ {t.value}</Text>
              <Text style={[styles.tableCell]}>{t.category}</Text>
              <Text style={[styles.tableCell]}>{t.userId}</Text>
              <Text style={[styles.tableCell]}>{String(t.createdAt)}</Text>
              <Text style={[styles.tableCell]}>{String(t.deletedAt)}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  // Gerando o PDF e fazendo o download
  pdf(<MyDocument />)
    .toBlob()
    .then((blob) => {
      saveAs(blob, fileName);
      console.log("PDF gerado com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao gerar PDF:", error);
    });
}
