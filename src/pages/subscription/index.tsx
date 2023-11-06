import React , { useState,useEffect } from 'react'
import Container from '@/components/layouts/container';
import GeneralModal from '@/components/atoms/modal/general-modal';
import { SubscribeService , CollectionItem} from '@/services/subscription';

export default function Subscription() {
    const [openSubModal, setOpenSubModal] = useState<boolean>(false)
    const [subscription, setSubscription] = useState<CollectionItem[]>([])
    const [typePlan, setTypePlan] = useState({
        type: "",
        price: "",
    })

    const getData = async () => {
        try {
            const subscriptionData = await SubscribeService.readSubscribe();
            setSubscription(subscriptionData);
        } catch (error:any) {
            alert(error.statusText)
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return(
        <Container title="Subscription">
            <div className="grid grid-cols-1">
                <h1 className="text-sm text-gray-500">Access to our rich analytics data by subscribing to your desired subscription plan.</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                    {/* basic plan */}
                    <div className="bg-white h-[35rem] rounded-lg shadow-lg py-4 flex flex-col relative">
                        <div className="space-y-5 text-center py-10 border-b">
                            <h1 className="font-semibold uppercase">{subscription[0]?.title}</h1>
                            <div className="text-primary-500 space-y-1">
                                <h1 className="text-4xl font-bold">RM {subscription[0]?.price}</h1>
                                <p className="text-sm">per month</p>
                            </div>
                        </div>
                        <div className="space-y-5 py-10 px-8">
                            <div className="space-y-4 text-sm text-gray-500">
                                <h1 className="text-gray-400 font-medium">ACCESS TO</h1>
                                {subscription[0]?.item.map((item, index) => (
                                    <div key={index}>
                                        <p>{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="absolute bottom-0 py-4 w-full px-6">
                            <button className="flex items-center justify-center bg-gray-50 w-full p-3 rounded-lg border border-gray-100">
                                <p className="text-gray-300">Current Plan</p>
                            </button>
                        </div>
                    </div>

                     {/* Popular plan */}
                    <div className="bg-white h-[35rem] rounded-lg shadow-lg  flex flex-col relative border-2 border-primary-500">
                        <h1 className="text-center bg-primary-500 text-sm py-1 text-white font-semibold">
                            POPULAR
                        </h1>
                        <div className="space-y-5 text-center pt-7 pb-10 border-b">
                            <h1 className="font-semibold uppercase">{subscription[1]?.title}</h1>
                            <div className="text-primary-500 space-y-1">
                                <h1 className="text-4xl font-bold">RM {subscription[1]?.price}</h1>
                                <p className="text-sm">per month</p>
                            </div>
                        </div>
                        <div className="space-y-5 py-10 px-8">
                            <div className="space-y-4 text-sm text-gray-500">
                                <h1 className="text-gray-400 font-medium">ACCESS TO</h1>
                                {subscription[1]?.item.map((item, index) => (
                                    <div key={index}>
                                        <p>{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="absolute bottom-0 py-4 w-full px-6">
                            <button 
                                onClick={() => {
                                    setTypePlan({ type: subscription[1]?.title, price:subscription[1]?.price })
                                    setOpenSubModal(true)
                                }} 
                                className="flex items-center justify-center bg-primary-500 w-full p-3 rounded-lg hover:bg-primary-600">
                                <p className="text-white">Subscribe plan</p>
                            </button>
                        </div>
                    </div>

                     {/* Super plan */}
                    <div className="bg-white h-[35rem] rounded-lg shadow-lg py-4 flex flex-col relative">
                        <div className="space-y-5 text-center py-10 border-b">
                            <h1 className="font-semibold uppercase">{subscription[2]?.title}</h1>
                            <div className="text-primary-500 space-y-1">
                                <h1 className="text-4xl font-bold">RM {subscription[2]?.price}</h1>
                                <p className="text-sm">per month</p>
                            </div>
                        </div>
                        <div className="space-y-5 py-10 px-8">
                            <div className="space-y-4 text-sm text-gray-500">
                                <h1 className="text-gray-400 font-medium">ACCESS TO</h1>
                                {subscription[2]?.item.map((item, index) => (
                                    <div key={index}>
                                        <p>{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="absolute bottom-0 py-4 w-full px-6">
                            <button 
                                onClick={() =>{ 
                                    setTypePlan({ type: subscription[2]?.title, price:subscription[2]?.price })
                                    setOpenSubModal(true)
                                }}
                                className="flex items-center justify-center bg-primary-500 w-full p-3 rounded-lg hover:bg-primary-600">
                                <p className="text-white">Subscribe plan</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* sub modal */}
            <GeneralModal size="md" openModal={openSubModal} onClose={() => setOpenSubModal(false)}>
                <div className="text-sm p-4 leading-6">
                    Billplz deduct <strong>RM {typePlan.price}</strong> (non-refundable) from your credit balance to activate the {typePlan.type} plan subscription from 27/05/2022 to 27/06/2022. Do you agree?
                </div>
                <div className="flex items-center mt-4 space-x-2 ">
                    <div className="w-1/2">
                        <button onClick={() => setOpenSubModal(false)} className="border w-full rounded-lg p-2 hover:bg-gray-50 text-sm shadow-sm font-semibold">
                            Cancel
                        </button>
                    </div>
                    <div className="w-1/2">
                        <button onClick={() => setOpenSubModal(false)}  className="border w-full rounded-lg p-2 hover:bg-gray-50 text-sm shadow-sm font-semibold">
                            OK
                        </button>
                    </div>
                </div>
            </GeneralModal>
        </Container>
    );
}