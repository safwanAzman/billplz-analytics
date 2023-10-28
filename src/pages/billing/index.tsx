import React,{useState,useEffect} from 'react'
import Container from '@/components/container';
import FilterDate from '@/components/menu/filter-date';
import BarList from '@/components/chart/bar-list';
import ChartCard from '@/components/card/chart-card';
import GeneralCard from '@/components/card/general-card';
import ColectionTable from '@/components/table/collections-table';
import GeneralModal from '@/components/modal/general-modal';
import {optionFilterDate} from '@/shared/option/option-date-data';
import {MagnifyingGlassIcon,FunnelIcon} from '@heroicons/react/24/outline'
import {
    moneyFormat, 
    calculateTotal,
    calculateOverallPercentage,
} from '@/utils/formartter'
import { 
    LineChart, 
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TextInput,
    DateRangePicker,
    DateRangePickerValue
} 
from "@tremor/react";

import { BillingService , 
    CollectionItem , 
    CollectionTop5,
    CollectionLineChart
} from '@/services/billing';

export default function BillingPage() {

    const [selected, setSelected] = useState(optionFilterDate[2])
    const [openFilterModal, setOpenFilterModal] = useState<boolean>(false)
    const [search, setSearch] = useState('');

    const [filterDate, setFilterDate] = useState<DateRangePickerValue>({});
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [totalCollection, setTotalCollection] = useState<CollectionItem[]>([])
    const [totalCollectionActive, setTotalCollectionActive] = useState<CollectionItem[]>([])
    const [totalCollectionInActive, setTotalCollectionInActive] = useState<CollectionItem[]>([])

    const [top5Performing, setTop5Performing] = useState<CollectionTop5[]>([])

    const [totalPaid, setTotalPaid] = useState<CollectionLineChart[]>([]);
    
    const updateFilter = (newSearch:string , newFilterDate: DateRangePickerValue) => {
        setSearch(newSearch)
        setStartDate(newFilterDate.from || null);
        setEndDate(newFilterDate.to || null);
    };

    const resetFilter = () => {
        setSearch('')
        setFilterDate({})
    };

    const getData = async () => {
        try {
        const [
            totalCollectionData,
            top5PerformingData,
            totalPaidData,
        ] = await Promise.all([
            BillingService.readTotalCollection(),
            BillingService.readTop5Performing(),
            BillingService.readTotalPaid(),
        ]);

        const activeData = totalCollectionData.filter((item:CollectionItem) => item.status === 'active');
        const inactiveData = totalCollectionData.filter((item:CollectionItem) => item.status === 'inactive');
        setTotalCollection(totalCollectionData);
        setTotalCollectionActive(activeData);
        setTotalCollectionInActive(inactiveData);
        setTop5Performing(top5PerformingData);
        setTotalPaid(totalPaidData);

        } catch (error) {
            alert(error)
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <Container 
            title="Billing"
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
            <div className='grid grid-cols-1'>
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-7 lg:col-span-12 xl:col-span-8 2xl:col-span-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* total paid card */}
                            <ChartCard
                                title="Total Paid"
                                total={moneyFormat(calculateTotal(totalPaid))}
                                percentage={calculateOverallPercentage(totalPaid)}
                                viewAllRoute=""
                                viewAllTitle="View all"
                                displayChart={
                                    <LineChart
                                        className="h-52 text-[0.55rem]"
                                        data={totalPaid}
                                        index="date"
                                        categories={
                                            totalPaid.length > 0 ? 
                                            Object.keys(totalPaid[0]).filter(key => key !== "date") : []
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
                        </div>
                    </div>

                    <div className="col-span-12  md:col-span-5 lg:col-span-12 xl:col-span-4 2xl:col-span-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500">Total Paid</p>
                                    <h1 className="text-lg font-semibold text-green-500">
                                        {moneyFormat(calculateTotal(totalPaid))}
                                    </h1>
                                </div>
                            </div>
                            <div className="bg-white border p-4 rounded-md shadow-md">
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500">Total Collections</p>
                                    <h1 className="text-lg font-semibold">
                                        {totalCollection.length}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <h1 className="pt-6 text-lg font-bold text-black capitalize">
                        Collections
                    </h1>
                    <TabGroup>
                        <div className="bg-white rounded-lg mt-2">
                            <div  className="flex lg:flex-row items-start pt-4 flex-col-reverse border-b justify-between ">
                                <TabList className="border-none">
                                    <div className="flex justify-start">
                                        <Tab>
                                            <p className="text-xs px-4">All</p>
                                        </Tab>
                                        <Tab>
                                            <p className="text-xs px-4">Active</p>
                                        </Tab>
                                        <Tab>
                                            <p className="text-xs px-4">Inactive</p>
                                        </Tab>
                                    </div>
                                </TabList>
                                <div className=" lg:-mt-1 mb-4 lg:mb-0 z-0">
                                    <div className="flex items-center space-x-2 px-4">
                                        <div className="w-full lg:w-96">
                                            <TextInput 
                                                style={{padding:4 }}
                                                icon={MagnifyingGlassIcon} 
                                                placeholder="Search..." 
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                        <button onClick={()=> setOpenFilterModal(true)} className="bg-white px-4 py-1 border rounded-md flex items-center justify-center space-x-1 hover:bg-gray-50">
                                            <FunnelIcon className="w-4 h-4"/>
                                            <h1 className="block truncate text-xs">Filter</h1>
                                        </button>
                                    </div>
                                </div>

                                {/* filter modal */}
                                <GeneralModal 
                                    title="Filter" 
                                    header={true}
                                    openModal={openFilterModal} 
                                    onClose={() => setOpenFilterModal(false)}
                                >
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                                            <div>
                                                <label className="text-xs">Collection Name</label>
                                                <TextInput 
                                                    value={search}
                                                    placeholder="Type to Search" 
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs">Date Range</label>
                                                <DateRangePicker 
                                                    className="max-w-sm mx-auto" 
                                                    enableSelect={false} 
                                                    value={filterDate}
                                                    onValueChange={(newFilterDate) => {
                                                        setFilterDate(newFilterDate);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs">Status</label>
                                                <div className="pt-1 pl-1 flex items-start space-y-2 lg:space-y-0 space-x-0 lg:items-center lg:space-x-2 lg:flex-row flex-col">
                                                    <div className="flex items-center space-x-2 text-xs ">
                                                        <input type="checkbox" className="form-checkbox " />
                                                        <label>Paid</label>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-xs ">
                                                        <input type="checkbox" className="form-checkbox " />
                                                        <label>Unpaid</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center lg:justify-end mt-12 lg:mt-4 space-x-2 bg-gray-50 p-4 rounded-md">
                                            <button 
                                                onClick ={()=>{
                                                    updateFilter(search,filterDate); 
                                                    setOpenFilterModal(false)
                                                }}
                                                className="text-xs bg-primary-500 px-4 py-2 text-white rounded-md hover:bg-primary-600">
                                                Apply Filter
                                            </button>
                                            <button
                                                onClick ={()=>{
                                                    resetFilter()
                                                }} 
                                                className="text-xs bg-white px-4 py-2 border rounded-md flex items-center justify-center space-x-1  hover:bg-gray-50">
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </GeneralModal>
                            </div>
                            <div>
                                <TabPanels>
                                    <TabPanel>
                                        <ColectionTable 
                                            data={totalCollection} 
                                            search={search}
                                            startDate={startDate} 
                                            endDate={endDate}
                                        />
                                    </TabPanel>

                                    <TabPanel>
                                        <ColectionTable 
                                            data={totalCollectionActive} 
                                            search={search}
                                            startDate={startDate} 
                                            endDate={endDate}
                                        />
                                    </TabPanel>

                                    <TabPanel>
                                        <ColectionTable 
                                            data={totalCollectionInActive} 
                                            search={search}
                                            startDate={startDate} 
                                            endDate={endDate}
                                        />
                                    </TabPanel>
                                </TabPanels>    
                            </div>
                        </div>
                    </TabGroup>
                </div>
            </div>
        </Container>
    );
}