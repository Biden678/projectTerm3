import React from 'react';
import ProductList from './components_mini/ProductList';
import InsuranceList from './components_mini/InsuranceList';

function ContractList(props) {
    return (
        <div>
            <InsuranceList/>
            <ProductList/>
        </div>
    );
}

export default ContractList;