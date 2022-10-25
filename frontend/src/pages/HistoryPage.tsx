import React from 'react';
import NavBar from '../components/common/NavBar';
import Table from '../components/history/Table';

export default () => {

return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <Table />
    </div>
    );
};