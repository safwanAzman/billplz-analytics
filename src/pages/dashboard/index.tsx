import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import Container from '@/components/container';
import FilterDate from '@/components/menu/filter-date';
import BarList from '@/components/chart/bar-list';
import {optionFilterDate} from '@/shared/option/option-date-data';
import {optionsActiveInactive,optionsPayment} from '@/shared/option/option-piechart';
import { LineChart } from "@tremor/react";
import { Chart } from "react-google-charts";
import { ArrowUpIcon,ArrowDownIcon,QuestionMarkCircleIcon} from '@heroicons/react/24/outline'
import {moneyFormat,dateFormat,calculateTotalForYear,calculatePercentageChange} from '@/utils/formartter'
import { DashboardService} from '@/services/dashboad';

interface CollectionItem {}

export default function Dashboard() {
    const [selected, setSelected] = useState(optionFilterDate[2])

    const [totalCollection, setTotalCollection] = useState<CollectionItem[]>([]);
    const [totalCollection2022, setTotalCollection2022] = useState<number>(0);
    const [totalCollection2023, setTotalCollection2023] = useState<number>(0);
    const [percentageCollection, setPercentageCollection] = useState<number>(0);

    const [totalTransaction, setTotalTransaction] = useState<CollectionItem[]>([]);
    const [totalTransaction2022, setTransaction2022] = useState<number>(0);
    const [totalTransaction2023, setTransaction2023] = useState<number>(0);
    const [percentageTransaction, setPercentageTransaction] = useState<number>(0);

    const [upcomingFpx, setUpcomingFpx] = useState<CollectionItem[]>([]);
    const [totalUpcomingFpx, setTotalUpcomingFpx] = useState<number>(0);

    const [totalPayout, setTotalPayout] = useState<CollectionItem[]>([]);
    const [totalPayout2022, setPayout2022] = useState<number>(0);
    const [totalPayout2023, setPayout2023] = useState<number>(0);
    const [percentagePayout, setPercentagePayout] = useState<number>(0);

    const [top5Performing, setTop5Performing] = useState<CollectionItem[]>([]);
    const [activeInactive, setActiveInactive] = useState<CollectionItem[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<CollectionItem[]>([]);


    const getData = async () => {
        try {
        const [
            totalCollectionData,
            totalTransactionData,
            upcomingFpxData,
            totalPayoutData,
            top5PerformingData,
            activeInactiveData,
            paymentMethodData,
        ] = await Promise.all([
            DashboardService.readTotalCollection(),
            DashboardService.readTotalTransaction(),
            DashboardService.readUpcomingFpx(),
            DashboardService.readTotalPayout(),
            DashboardService.readTop5Performing(),
            DashboardService.readActiveInactive(),
            DashboardService.readPaymentMethod(),
        ]);

        //Total Collections
        setTotalCollection(totalCollectionData);
        const totalCollection2022 = calculateTotalForYear(totalCollectionData, "2022");
        const totalCollection2023 = calculateTotalForYear(totalCollectionData, "2023");
        const percentageChangeCollection = calculatePercentageChange(totalCollection2023, totalCollection2022);
        setTotalCollection2022(totalCollection2022);
        setTotalCollection2023(totalCollection2023);
        setPercentageCollection(percentageChangeCollection);

        //Total Transaction
        setTotalTransaction(totalTransactionData);
        const totalTransaction2022 = calculateTotalForYear(totalTransactionData, "2022");
        const totalTransaction2023 = calculateTotalForYear(totalTransactionData, "2023");
        const percentageChangeTransaction = calculatePercentageChange(totalTransaction2023, totalTransaction2022);
        setTransaction2022(totalTransaction2022);
        setTransaction2023(totalTransaction2023);
        setPercentageTransaction(percentageChangeTransaction);

        //Upcoming FPX
        setUpcomingFpx(upcomingFpxData);
        const totalOverallFpxPayout: number = upcomingFpxData.reduce((sum:number, item) => sum + item.total, 0);
        setTotalUpcomingFpx(totalOverallFpxPayout);

        //Total Payout
        setTotalPayout(totalPayoutData);
        const totalPayout2022 = calculateTotalForYear(totalPayoutData, "2022");
        const totalPayout2023 = calculateTotalForYear(totalPayoutData, "2023");
        const percentageChangePayout = calculatePercentageChange(totalPayout2023, totalPayout2022);
        setPayout2022(totalPayout2022);
        setPayout2023(totalPayout2023);
        setPercentagePayout(percentageChangePayout);

        //Top 5 Performing
        setTop5Performing(top5PerformingData);

        //Active/Inactive
        setActiveInactive(activeInactiveData);

        //Payment Method
        setPaymentMethod(paymentMethodData);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <Container 
            title="Overview Dashboard"
            contentRight={
            <div className="flex items-center space-x-2 relative">
                <FilterDate 
                    options={optionFilterDate}
                    selected={selected}
                    setSelected={setSelected}
                />
                <h1 className="text-xs text-gray-600 capitalize">
                    Compared to previous {selected.label}
                </h1>
            </div>
            }
        >
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 mt-4 gap-4'>
                
                {/* total collections card */}
                <div className="bg-white  p-2 rounded-md shadow-md">
                    <div className="px-4 py-4 space-y-2">
                        <div className="flex items-center justify-between  text-xs font-semibold">
                            <p>Total Collections</p>
                            <Link href="" className="text-primary-600 hover:text-primary-500">
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
                <div className="bg-white p-2 rounded-md shadow-md">
                    <div className="px-4 py-4 space-y-2">
                        <div className="flex items-center justify-between  text-xs font-semibold">
                            <p>Total Transactions</p>
                            <Link href="" className="text-primary-600 hover:text-primary-500">
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
                <div className="bg-white p-2 rounded-md shadow-md">
                    <div className="px-4 py-4 space-y-2">
                        <div className="flex items-center justify-between  text-xs font-semibold">
                            <div className="flex items-center space-x-1">
                                <p>Upcoming FPX Payout</p>
                                <QuestionMarkCircleIcon className="w-4 h-4 text-primary-500"/>
                            </div>
                            <Link href="" className="text-primary-600 hover:text-primary-500">
                                See details
                            </Link>
                        </div>
                        <div className="space-y-2 border-b pb-4 border-dashed">
                            <h1 className="text-lg font-semibold">
                                {moneyFormat(totalUpcomingFpx)}
                            </h1>
                            <h1 className="text-xs text-gray-500">Expected to reach your bank account 12 Sept 2021</h1>
                        </div>

                        <div className="space-y-4 pt-6">
                            <h1 className="text-gray-500 font-semibold text-xs">COLLECTION DATE</h1>
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
                <div className="bg-white p-2 rounded-md shadow-md">
                    <div className="px-4 py-4 space-y-2">
                        <div className="flex items-center justify-between  text-xs font-semibold">
                            <p>Total Payout</p>
                            <Link href="" className="text-primary-600 hover:text-primary-500">
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
                <div className="bg-white p-2 rounded-md shadow-md">
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
                <div className="bg-white p-2 rounded-md shadow-md">
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
                <div className="bg-white p-2 rounded-md shadow-md">
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
                            {Array.isArray(paymentMethod) && paymentMethod.slice(1).map((item: any, index: any) => (
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
    )
}
