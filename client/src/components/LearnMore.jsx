import React from 'react'
import {motion} from 'framer-motion'
import { fadeIn, staggerContainer } from '../animation/motion';
export default function LearnMore() {
  return (
    <motion.div  variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }}
    className=' bg-yellow-100 w-full h-screen justify-center content-center items-center flex align-text-top mx-auto flex-wrap gap-y-10'>
        <div className=' w-full row-span-full block items-center justify-center content-center'>
          <center><motion.p variants={fadeIn("top", "tween", 0.2, 1)} className=' text-7xl font-extrabold items-center'>Why us?</motion.p></center>
        </div>
        <br/> 
        <div className=' flex col-span-3 gap-7 content-center justify-around'>
            <p className=' '>
            <motion.div variants={fadeIn("left", "tween", 0.2, 1)} className='h-[300px] w-[300px] bg-pink-100 mx-auto items-center justify-center flex content-center flex-wrap '>
                <center><h2 className='text-4xl font-bold mb-1'>Safety</h2></center>
                <center><p className='text-lg flex-wrap'>We ensure the safety of the passengers and the driver by alerting them about the driver's drowsiness</p></center>
            </motion.div>
            </p>
            <motion.div variants={fadeIn("bottom", "tween", 0.2, 1)} className='h-[300px] w-[300px] bg-blue-100 mx-auto items-center justify-center content-center flex flex-wrap '>
                <center><h2 className='text-4xl font-bold'>Reliability</h2></center>
                <center><p className='text-lg flex-wrap'>We are reliable and we ensure the safety of the passengers and the driver</p></center>
            </motion.div>
            <motion.div variants={fadeIn("right", "tween", 0.2, 1)} className='h-[300px] w-[300px] bg-green-100 mx-auto items-center justify-center content-center flex flex-wrap '>
            <center><h2 className='text-4xl font-bold'>Affordable</h2></center>
            <center><p className='text-lg flex-wrap'>We are affordable and we ensure the safety of the passengers and the driver</p></center>
            </motion.div>
        </div>
    </motion.div>
  )
}