import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { Range } from 'rc-slider';
import SP from './spJson'
import SPListView from './SPList'
import { Table } from 'reactstrap';

function App() {
  const [value, setValue] = useState([1926, 2019]);
  const [spList, setspList] = useState(SP);
  const [spListFilter, setspListFilter] = useState(SP);
  const [totalReturn, setTotalReturn] = useState(0);
  const [reverseOrderYear, setReverseOrder] = useState(true)
  const [reverseOrderReturn, setReverseReturn] = useState(false)

  useEffect(() => {
    filterList()
    totalReturnSum()
  }, [value]);

  const filterList = () => {
    setspListFilter(spList.sort((a, b) => a.year - b.year).filter(sp => sp.year >= value[0] && sp.year <= value[1]))
  }

  const totalReturnSum = () => {
    console.log(spListFilter)
    let sum = 0
    for (let i = 0; i < spListFilter.length; i++) {
      sum += parseFloat(spListFilter[i].totalReturn)
    }
    setTotalReturn(sum.toFixed(2))
  }

  const reverseListYear = () => {
    let tempList = [...spListFilter]
    if (reverseOrderYear) {
      tempList.sort((a, b) => b.year - a.year);
    }
    else {
      tempList.sort((a, b) => a.year - b.year);
    }
    setspListFilter(tempList)
    setReverseOrder(reverseOrderYear => !reverseOrderYear)

  }

  const reverseListReturn = () => {
    let tempList = [...spListFilter]
    if (reverseOrderReturn) {
      tempList.sort((a, b) => b.totalReturn - a.totalReturn);
    }
    else {
      tempList.sort((a, b) => a.totalReturn - b.totalReturn);
    }
    setspListFilter(tempList)
    setReverseReturn(reverseOrderReturn => !reverseOrderReturn)
  }

  console.log(reverseOrderReturn)

  return (
    <div className="App">
      <h1>S&P 500 Total Returns</h1>
      <div className='Table-Container'>
        <div>
          <div className='Year-flex'>
            <p>
              {value[0]}
            </p>
            <p>
              {value[1]}
            </p>

          </div>
          <Range allowCross={false} onChange={e => { setValue(e) }} value={value} min={1926} max={2019} defaultValue={[1926, 2019]} tipFormatter={value => `${value}`} />
        </div>
        <Table striped  bordered>
          <thead>
            <tr>
              <th style={{cursor:'pointer'}} onClick={reverseListYear}>Year {reverseOrderYear ? 'v' : '^'}  </th>
              <th style={{cursor:'pointer'}} onClick={reverseListReturn}
              >Total Return
                {reverseOrderReturn ? ' v' : ' ^'}
              </th>
              <th  onClick={reverseListReturn}
              >Cumulative ${totalReturn}
              </th>
            </tr>
          </thead>
          <tbody>
            {spListFilter.map(SP =>
              <SPListView key={SP.year} SP={SP} />
            )}
          </tbody>
          
        </Table>
      </div>
    </div>
  );
}

export default App;
