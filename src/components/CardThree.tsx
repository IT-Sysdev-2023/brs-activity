import axios from '../http/axios';
import { useEffect, useState } from 'react';
import PercentageChange from './PercentageChange';
import { NumberPairTypes } from '../types';

const CardThree = () => {
  const [bankAccounts, setBankAccount] = useState<NumberPairTypes>({
    activeBankAccounts: 0,
    activeBankAccountChanges: 0,
  });

  useEffect(() => {
    const total = async () => {
      const response = await axios.get('/bank-account-total');
      setBankAccount(response.data);
    };

    total();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">

        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {' '}
            <path
              d="M3 21.0001H21M4 18.0001H20M6 18.0001V13.0001M10 18.0001V13.0001M14 18.0001V13.0001M18 18.0001V13.0001M12 7.00695L12.0074 7.00022M21 10.0001L14.126 3.88986C13.3737 3.2212 12.9976 2.88688 12.5732 2.75991C12.1992 2.64806 11.8008 2.64806 11.4268 2.75991C11.0024 2.88688 10.6263 3.2212 9.87404 3.88986L3 10.0001H21Z"
              stroke="#3C50E0"
              strokeWidth="1.224"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{' '}
          </g>
        </svg>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {bankAccounts.activeBankAccounts}
          </h4>
          <span className="text-sm font-medium">Active Bank Accounts</span>
        </div>

        <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
          <PercentageChange percent={bankAccounts.activeBankAccountChanges} />
        </span>
      </div>
    </div>
  );
};

export default CardThree;
