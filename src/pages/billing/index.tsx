import React,{useState} from 'react'
import Link from 'next/link';
import Container from '@/components/container';
import FilterDate from '@/components/menu/filter-date';
import BarList from '@/components/chart/bar-list';
import ColectionTable from '@/components/table/collections-table';
import GeneralModal from '@/components/modal/general-modal';
import {optionFilterDate} from '@/shared/option/option-date-data';
import {chartdata} from '@/shared/data/line-chart-data';
import { collectionData } from '@/shared/data/collection-data';
import { collectionTop5Data } from '@/shared//data/collection-top5-data';
import { 
    LineChart, 
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    TextInput,
    DateRangePicker
} 
from "@tremor/react";
import { 
    ArrowUpIcon,
    MagnifyingGlassIcon,
    FunnelIcon
} from '@heroicons/react/24/outline'


export default function billingPage() {
    const [selected, setSelected] = useState(optionFilterDate[2])
    const [openFilterModal, setOpenFilterModal] = useState<boolean>(false)
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
                    <h1 className="text-xs text-gray-400 capitalize">
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
                            <div className="bg-white border p-2 rounded-md shadow-md">
                                <div className="px-4 py-4 space-y-2">
                                    <div className="flex items-center justify-between  text-xs font-semibold">
                                        <p>Total Paid</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <h1 className="text-lg font-semibold">RM 900.00</h1>
                                        <div className="font-normal text-green-500 flex items-center space-x-1">
                                        <ArrowUpIcon className="w-4 h-4"/>
                                        <p>10.6%</p>
                                        </div>
                                    </div>
                                </div>
                                <LineChart
                                    className="h-52 text-[0.55rem] z-0"
                                    data={chartdata}
                                    index="date"
                                    categories={["2022", "2023"]}
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
                                    {collectionTop5Data.map((item, index) => (
                                        <BarList
                                            key={index}
                                            title={item.title}
                                            total={`RM ${item.total}`}
                                            percentageValue={item.percentageValue}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12  md:col-span-5 lg:col-span-12 xl:col-span-4 2xl:col-span-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-1 gap-4">
                            <div className="bg-white border p-4 rounded-md shadow-md">
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-400">Total Paid</p>
                                    <h1 className="text-lg font-semibold text-green-500">RM 10,000.00</h1>
                                </div>
                            </div>
                            <div className="bg-white border p-4 rounded-md shadow-md">
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-400">Total Collections</p>
                                    <h1 className="text-lg font-semibold">10</h1>
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
                                                    placeholder="Type to Search" 
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs">Date Range</label>
                                                <DateRangePicker 
                                                    className="max-w-sm mx-auto" 
                                                    enableSelect={false} 
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
                                            <button className="text-xs bg-primary-500 px-4 py-2 text-white rounded-md hover:bg-primary-600">
                                                Apply Filter
                                            </button>
                                            <button className="text-xs bg-white px-4 py-2 border rounded-md flex items-center justify-center space-x-1  hover:bg-gray-50">
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </GeneralModal>
                            </div>
                            <div>
                                <TabPanels>
                                    <TabPanel>
                                        <ColectionTable data={collectionData}/>
                                    </TabPanel>

                                    <TabPanel>
                                        <ColectionTable data={collectionData}/>
                                    </TabPanel>

                                    <TabPanel>
                                        <ColectionTable data={collectionData}/>
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