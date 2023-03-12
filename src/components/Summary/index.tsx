import { useContext } from "react";
import { ArrowCircleUp, CurrencyDollar, ArrowCircleDown } from "phosphor-react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { SummaryCard, SummaryContainer } from "./styles";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acc, transaction) => {
      const price = Number(transaction.price);

      if (transaction.type === 'income') {
        acc.income += price;
        acc.total += price;
      } else {
        acc.outcome += price;
        acc.total -= price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0
    }
  );

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entrada</span>
          <ArrowCircleUp size={32} color='#00b37e'/>
        </header>

        <strong>{summary.income}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color='#f75a68'/>
        </header>

        <strong>{summary.outcome}</strong>
      </SummaryCard>

      <SummaryCard variant='green'>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color='#fff'/>
        </header>

        <strong>{summary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}