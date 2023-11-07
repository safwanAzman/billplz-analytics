import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import Container from '@/components/layouts/container';
import FilterDate from '@/components/atoms/menu/filter-date';
import BarList from '@/components/atoms/chart/bar-list';
import ChartCard from '@/components/atoms/card/chart-card';
import GeneralCard from '@/components/atoms/card/general-card';
import {optionFilterDate,filterDataBySelected} from '@/shared/option/option-date-data';
import {optionsActiveInactive,optionsPayment} from '@/shared/option/option-piechart';
import { LineChart } from "@tremor/react";
import { Chart } from "react-google-charts";
import {QuestionMarkCircleIcon} from '@heroicons/react/24/outline'
import {
    moneyFormat,
    dateFormat,
    calculateTotal,
    calculateOverallPercentage,
    calulateTotalGeneral,
} from '@/utils/formartter'
import {
    CollectionPieChart,
    CollectionLineChart,
    CollectionTop5,
    CollectionFpxUpcoming
} from '@/types'

import {DashboardService} from '@/services/dashboad';

export default function Dashboard() {
    const [selected, setSelected] = useState(optionFilterDate[2])

    const [totalCollection, setTotalCollection] = useState<CollectionLineChart[]>([]);
    const [totalTransaction, setTotalTransaction] = useState<CollectionLineChart[]>([]);
    const [upcomingFpx, setUpcomingFpx] = useState<CollectionFpxUpcoming[]>([]);
    const [totalPayout, setTotalPayout] = useState<CollectionLineChart[]>([]);
    const [top5Performing, setTop5Performing] = useState<CollectionTop5[]>([]);
    const [activeInactive, setActiveInactive] = useState<CollectionPieChart[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<CollectionPieChart[]>([]);


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
            ])
            
            setTotalCollection(totalCollectionData);
            setTotalTransaction(totalTransactionData);
            setUpcomingFpx(upcomingFpxData);
            setTotalPayout(totalPayoutData);
            setTop5Performing(top5PerformingData);
            setActiveInactive(activeInactiveData);
            setPaymentMethod(paymentMethodData);
            
            } catch (error:any) {
                alert(error.statusText)
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
                <ChartCard
                    title="Total Collections"
                    total={moneyFormat(calculateTotal(filterDataBySelected(selected, totalCollection)))}
                    percentage={calculateOverallPercentage(filterDataBySelected(selected, totalCollection))}
                    type={
                        calculateOverallPercentage(filterDataBySelected(selected, totalCollection)) <= '20'?
                        'dropPercentage' : ''
                    }
                    viewAllTitle="View all"
                    displayChart={
                        <LineChart
                            className="h-52 text-[0.55rem]"
                            data={filterDataBySelected(selected, totalCollection)}
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
                    }
                />
                
                {/* total transactions card */}
                <ChartCard
                    title="Total Transactions"
                    total={moneyFormat(calculateTotal(filterDataBySelected(selected, totalTransaction)))}
                    percentage={calculateOverallPercentage(filterDataBySelected(selected, totalTransaction))}
                    type={
                        calculateOverallPercentage(filterDataBySelected(selected, totalTransaction)) <= '20'?
                        'dropPercentage' : ''
                    }
                    viewAllTitle="View all"
                    displayChart={
                        <LineChart
                            className="h-52 text-[0.55rem]"
                            data={filterDataBySelected(selected, totalTransaction)}
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
                    }
                />

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
                                {moneyFormat(calulateTotalGeneral(upcomingFpx))}
                            </h1>
                            <h1 className="text-xs text-gray-500">
                                Expected to reach your bank account 12 Sept 2021
                            </h1>
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
                <ChartCard
                    title="Total Payout"
                    total={moneyFormat(calculateTotal(filterDataBySelected(selected, totalPayout)))}
                    percentage={calculateOverallPercentage(filterDataBySelected(selected, totalPayout))}
                    type={
                        calculateOverallPercentage(filterDataBySelected(selected, totalPayout)) <= '20'?
                        'dropPercentage' : ''
                    }
                    viewAllTitle="View all"
                    displayChart={
                        <LineChart
                            className="h-52 text-[0.55rem]"
                            data={filterDataBySelected(selected,totalPayout)}
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
                    }
                />

                {/* top 5 Peforming Collections card */}
                <GeneralCard
                    title="Top 5 Performing Collections"
                    content={
                    <>
                    {top5Performing.map((item:any, index:any) => (
                        <BarList
                            key={index}
                            title={item.title}
                            total={moneyFormat(item.total)}
                            percentageValue={item.percentageValue}
                        />
                    ))}
                    </>
                    }
                />

                {/* active vs. inactive Collections */}
                <GeneralCard
                    title="Active Vs. Inactive Collections"
                    content={
                    <div>
                        <Chart
                            className='-mt-16'
                            chartType="PieChart"
                            data={activeInactive}
                            options={optionsActiveInactive}
                        />
                    </div>
                    }
                />

                {/* Collections by Payment Methods */}
                <GeneralCard
                    title="Collections by Payment Methods"
                    content={
                    <div>
                        <div>
                            <Chart
                                className="-mt-16"
                                chartType="PieChart"
                                data={paymentMethod}
                                options={optionsPayment}
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-around text-[0.65rem] -mt-16 pb-4 ">
                                {Array.isArray(paymentMethod) && paymentMethod.slice(1).map((item: any, index: any) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex space-x-2 items-start">
                                        <div className={`rounded-full w-3 h-3 mt-0.5
                                            ${item[0] == 'Online Banking' 
                                            ? 'bg-primary-500' : item[0] == 'Cards' 
                                            ? 'bg-primary-400' : 'bg-primary-300'}`}>
                                        </div>
                                        <div className="">
                                            <p>{item[0]}</p>
                                            <p className="text-gray-500">
                                                {moneyFormat(item[1])}
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                }
                />
            </div>
        </Container>
    )
}
