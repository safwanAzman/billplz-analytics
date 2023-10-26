import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import Container from '@/components/container';
import FilterDate from '@/components/menu/filter-date';
import BarList from '@/components/chart/bar-list';
import Loading from '@/components/loading';
import {optionFilterDate} from '@/shared/option/option-date-data';
import {optionsActiveInactive,optionsPayment} from '@/shared/option/option-piechart';
import { LineChart } from "@tremor/react";
import { Chart } from "react-google-charts";
import { ArrowUpIcon,ArrowDownIcon,QuestionMarkCircleIcon} from '@heroicons/react/24/outline'
import {moneyFormat ,dateFormat} from '@/utils/formartter'

import { 
    readTotalCollection,
    readTotalTransaction,
    readUpcomingFpx,
    readTotalPayout,
    readTop5Performing,
    readActiveInactive,
    readPaymentMethod
} from '@/services/dashboad';

export const dataPiePayment = [
    ["Payment", "Payment Data"],
    ["Online Banking", 10000],
    ["Cards", 2330],
    ["E-wallet", 900],
];

export default function dashboard() {
    const [selected, setSelected] = useState(optionFilterDate[2])
    const [loading, setLoading] = useState<boolean>(false)

    //get total collections
    const [totalCollection, setTotalCollection] = useState<any>([])
    const [totalCollection2022, setTotalCollection2022] = useState<number>(0);
    const [totalCollection2023, setTotalCollection2023] = useState<number>(0);
    const [percentageCollection, setPercentageCollection] = useState<number>(0)
    const getTotalCollection = async () => {
        readTotalCollection(
            setTotalCollection2022,
            setTotalCollection2023,
            setPercentageCollection,
            setTotalCollection,
            setLoading
        );
    };

    //get total Transaction
    const [totalTransaction, setTotalTransaction] = useState<any>([])
    const [totalTransaction2022, setTransaction2022] = useState<number>(0);
    const [totalTransaction2023, setTransaction2023] = useState<number>(0);
    const [percentageTransaction, setPercentageTransaction] = useState<number>(0)

    const getTotalTransaction = async () => {
        readTotalTransaction(
            setTransaction2022,
            setTransaction2023,
            setPercentageTransaction,
            setTotalTransaction,
            setLoading
        )
    };

    //get total Transaction
    const [upcomingFpx, setUpcomingFpx] = useState<any>([])
    const [totalUpcomingFpx, setTotalUpcomingFpx] = useState<number>(0);
    const getUpcomingFpx = async () => {
        readUpcomingFpx(
            setUpcomingFpx,
            setTotalUpcomingFpx,
            setLoading
        )
    };

    //get total Payout
    const [totalPayout, setTotalPayout] = useState<any>([])
    const [totalPayout2022, setPayout2022] = useState<number>(0);
    const [totalPayout2023, setPayout2023] = useState<number>(0);
    const [percentagePayout, setPercentagePayout] = useState<number>(0)
    const getTotalPayout = async () => {
        readTotalPayout(
            setPayout2022,
            setPayout2023,
            setPercentagePayout,
            setTotalPayout,
            setLoading
        )
    };

    //top 5 Peforming Collections
    const [top5Performing, setTop5Performing] = useState<any>([])
    const getTop5Performing = async () => {
        readTop5Performing(
            setTop5Performing,
            setLoading
        )
    };

    //active vs. inactive Collections
    const [activeInactive, setActiveInactive] = useState<any>([])
    const getActiveInactive = async () => {
        readActiveInactive(
            setActiveInactive,
            setLoading
        )
    };

    //Collections by Payment Methods
    const [paymentMethod, setPaymentMethod] = useState<any>([])
    const getPaymentMethod = async () => {
        readPaymentMethod(
            setPaymentMethod,
            setLoading
        )
        console.log(paymentMethod);
    };

    useEffect(() => {
        getTotalCollection();
        getTotalTransaction();
        getUpcomingFpx();
        getTotalPayout();
        getTop5Performing();
        getActiveInactive();
        getPaymentMethod();
    }, [])
    

    return (
        <>
        {loading ?
            <Loading/>
            : 
            <Container 
                title="Overview Dashboard"
                contentRight={
                <div className="flex items-center space-x-2 relative">
                    <FilterDate 
                        options={optionFilterDate}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <h1 className="text-xs text-gray-400 capitalize">
                        Compared to previous {selected.label}
                    </h1>
                </div>
                }
                >
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 mt-4 gap-4'>

                    {/* total collections card */}
                    <div className="bg-white border p-2 rounded-md shadow-md">
                        <div className="px-4 py-4 space-y-2">
                            <div className="flex items-center justify-between  text-xs font-semibold">
                                <p>Total Collections</p>
                                <Link href="" className="text-primary-500 hover:text-primary-600">
                                    View all
                                </Link>
                            </div>
                            <div className="flex items-center space-x-2">
                                <h1 className="text-lg font-semibold">
                                    {moneyFormat(totalCollection2022 + totalCollection2023)}
                                </h1>
                                <div className="font-normal text-green-500 flex items-center space-x-1">
                                    <ArrowUpIcon className="w-4 h-4"/>
                                    <p>{Math.abs(percentageCollection).toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                        <LineChart
                            className="h-52 text-[0.55rem]"
                            data={totalCollection}
                            index="date"
                            categories={
                                totalCollection.length > 0 ? 
                                Object.keys(totalCollection[0]).filter(key => key !== "date") : []
                            }
                            colors={["gray", "blue"]}
                            yAxisWidth={40}
                            connectNulls={true}
                            showAnimation={true}
                            showLegend={false}
                            />
                    </div>

                    {/* total transactions card */}
                    <div className="bg-white border p-2 rounded-md shadow-md">
                        <div className="px-4 py-4 space-y-2">
                            <div className="flex items-center justify-between  text-xs font-semibold">
                                <p>Total Transactions</p>
                                <Link href="" className="text-primary-500 hover:text-primary-600">
                                    View all
                                </Link>
                            </div>
                            <div className="flex items-center space-x-2">
                                <h1 className="text-lg font-semibold">
                                    {moneyFormat(totalTransaction2022 + totalTransaction2023)}
                                </h1>
                                <div className="font-normal text-red-500 flex items-center space-x-1">
                                    <ArrowDownIcon className="w-4 h-4"/>
                                    <p>{Math.abs(percentageTransaction).toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                        <LineChart
                            className="h-52 text-[0.55rem]"
                            data={totalTransaction}
                            index="date"
                            categories={
                                totalTransaction.length > 0 ? 
                                Object.keys(totalTransaction[0]).filter(key => key !== "date") : []
                            }
                            colors={["gray", "blue"]}
                            yAxisWidth={40}
                            connectNulls={true}
                            showAnimation={true}
                            showLegend={false}
                            />
                    </div>

                    {/* upcoming FPX Payout card */}
                    <div className="bg-white border p-2 rounded-md shadow-md">
                        <div className="px-4 py-4 space-y-2">
                            <div className="flex items-center justify-between  text-xs font-semibold">
                                <div className="flex items-center space-x-1">
                                    <p>Upcoming FPX Payout</p>
                                    <QuestionMarkCircleIcon className="w-4 h-4 text-primary-500"/>
                                </div>
                                <Link href="" className="text-primary-500 hover:text-primary-600">
                                    See details
                                </Link>
                            </div>
                            <div className="space-y-2 border-b pb-4 border-dashed">
                                <h1 className="text-lg font-semibold">
                                    {moneyFormat(totalUpcomingFpx)}
                                </h1>
                                <h1 className="text-xs text-gray-400">Expected to reach your bank account 12 Sept 2021</h1>
                            </div>

                            <div className="space-y-4 pt-6">
                                <h1 className="text-gray-400 font-semibold text-xs">COLLECTION DATE</h1>
                                {upcomingFpx.map((item:any, index:any) => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <h1 className=" text-sm">
                                            {dateFormat(item.date, 'dd MMMM yyyy')}
                                        </h1>
                                        <h1 className="font-semibold text-sm">
                                            {moneyFormat(item.total)}
                                        </h1>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* total Payouts card */}
                    <div className="bg-white border p-2 rounded-md shadow-md">
                        <div className="px-4 py-4 space-y-2">
                            <div className="flex items-center justify-between  text-xs font-semibold">
                                <p>Total Payout</p>
                                <Link href="" className="text-primary-500 hover:text-primary-600">
                                    View all
                                </Link>
                            </div>
                            <div className="flex items-center space-x-2">
                                <h1 className="text-lg font-semibold">
                                    {moneyFormat(totalPayout2022 + totalPayout2023)}
                                </h1>
                                <div className="font-normal text-green-500 flex items-center space-x-1">
                                    <ArrowUpIcon className="w-4 h-4"/>
                                    <p>{Math.abs(percentagePayout).toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                        <LineChart
                            className="h-52 text-[0.55rem]"
                            data={totalPayout}
                            index="date"
                            categories={
                                totalPayout.length > 0 ? 
                                Object.keys(totalPayout[0]).filter(key => key !== "date") : []
                            }
                            colors={["gray", "blue"]}
                            yAxisWidth={40}
                            connectNulls={true}
                            showAnimation={true}
                            showLegend={false}
                            />
                    </div>

                    {/* top 5 Peforming Collections card */}
                    <div className="bg-white border p-2 rounded-md shadow-md">
                        <div className="px-4 py-4 space-y-2">
                            <div className="flex items-center text-xs font-semibold">
                                <p>Top 5 Performing Collections</p>
                            </div>
                            {top5Performing.map((item:any, index:any) => (
                                <BarList
                                    key={index}
                                    title={item.title}
                                    total={moneyFormat(item.total)}
                                    percentageValue={item.percentageValue}
                                />
                            ))}
                        </div>
                    </div>

                    {/* active vs. inactive Collections */}
                    <div className="bg-white border p-2 rounded-md shadow-md">
                        <div className="px-4 py-4 space-y-2">
                            <div className="text-xs font-semibold">
                                <p>Active Vs. Inactive Collections</p>
                            </div>
                        </div>
                        <div className="-mt-16">
                            <Chart
                                chartType="PieChart"
                                data={activeInactive}
                                options={optionsActiveInactive}
                            />
                        </div>
                    </div>

                    {/* Collections by Payment Methods */}
                    <div className="bg-white border p-2 rounded-md shadow-md">
                        <div className="px-4 py-4 space-y-2">
                            <div className="text-xs font-semibold">
                                <p>Collections by Payment Methods</p>
                            </div>
                        </div>
                        <div className="-mt-16">
                            <Chart
                                chartType="PieChart"
                                data={paymentMethod}
                                options={optionsPayment}
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-around text-[0.65rem] -mt-10 pb-4 ">
                                {paymentMethod.slice(1).map((item: any, index: any) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex space-x-2 items-start">
                                        <div className={`rounded-full w-3 h-3 mt-0.5
                                        ${item[0] == 'Online Banking' ? 'bg-primary-500' : item[0] == 'Cards' ? 'bg-primary-400' : 'bg-primary-300'}`}></div>
                                        <div className="">
                                            <p>{item[0]}</p>
                                            <p className="text-gray-500">{moneyFormat(item[1])}</p>
                                        </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </Container>
        }
        </>
    )
}
