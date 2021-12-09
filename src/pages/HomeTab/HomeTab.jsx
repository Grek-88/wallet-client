import { useMediaQuery } from 'react-responsive';
import Navigation from 'components/Navigation';
import Balance from 'components/Balance';
import Currency from 'components/Currency';
import ButtonAddTransactions from 'components/ButtonAddTransactions';
import Container from 'components/Container';
import Section from 'components/Section';
import Background from 'pages/Background';
import TableTransaction from 'components/TableTransaction';
// import Header from 'components/Header';
import { TableData, TableTitleData } from '../../data/tableData';
import s from './HomeTab.module.css';

const HomeTab = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  return (
    <>
      <Background className={s.backdrop}>
        {/* <Header /> */}
        <Section className={s.hometabBackground}>
          <Container>
            <div className={s.hometab}>
              <div className={s.leftSideBox}>
                <div>
                  <div className={s.navigation}>
                    <Navigation />
                  </div>
                  <div className={s.balance}>
                    <Balance />
                  </div>
                </div>
                {!isMobile && <Currency />}
              </div>
              <div className={s.table}>
                <TableTransaction data={TableData} titles={TableTitleData} />
              </div>
              <div className={s.btnAdd}>
                <ButtonAddTransactions />
              </div>
            </div>
          </Container>
        </Section>
      </Background>
    </>
  );
};

export default HomeTab;
