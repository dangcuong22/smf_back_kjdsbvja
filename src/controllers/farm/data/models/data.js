const mongoose = require('mongoose');

// const SubstationSchema = new mongoose.Schema({
//     sub_id: {
//         type: String,
//         required: true
//     },
//     sensor_1: {
//         id: String,
//         name: String,
//         RF_signal: String,
//     },
//     sensor_2:{
//         RF_signal: String,
//         id: String,
//         name: String,
//         EOC: Number,
//         value: Number,
//         battery: Number
//     },
//     sensor_3:{
//         RF_signal: String,
//         id: String,
//         name: String,
//         EOC: Number,
//         value: Number,
//         battery: Number
//     },
//     T1: {type: Number, require: true},
//     T2: {type: Number, require: true},
//     T3: {type: Number, require: true},
//     T4: {type: Number, require: true},
//     H1: {type: Number, require: true},
//     H2: {type: Number, require: true},
//     H3: {type: Number, require: true},
//     H4: {type: Number, require: true},
//     L1: {type: Number, require: true},
//     L2: {type: Number, require: true},
//     L3: {type: Number, require: true},
//     L4: {type: Number, require: true},
//     PH1: {type: Number, require: true},
//     PH2: {type: Number, require: true},
//     PH3: {type: Number, require: true},
//     PH4: {type: Number, require: true},
//     SM1: {type: Number, require: true},
//     SM2: {type: Number, require: true},
//     SM3: {type: Number, require: true},
//     SM4: {type: Number, require: true},
//     time: Date,
//     created_date: {
//         type: Date,
//         default: Date.now()
//     }
// },{ versionKey: false });

const SubstationSchema = new mongoose.Schema({
	sub_id: {
		type: String,
		required: true
	},
	T1: {value: String, battery: String, RF_signal: String},
	T2: {value: String, battery: String, RF_signal: String},
	H1: {value: String, battery: String, RF_signal: String},
	H2: {value: String, battery: String, RF_signal: String},
	L1: {value: String, battery: String, RF_signal: String},
	L2: {value: String, battery: String, RF_signal: String},
	PH1: {value: String, battery: String, RF_signal: String},
	PH2: {value: String, battery: String, RF_signal: String},
	SM1: {value: String, battery: String, RF_signal: String},
	SM2: {value: String, battery: String, RF_signal: String},
	SM3: {value: String, battery: String, RF_signal: String},
	SM4: {value: String, battery: String, RF_signal: String},
	SM5: {value: String, battery: String, RF_signal: String},
	SM6: {value: String, battery: String, RF_signal: String},
	SM7: {value: String, battery: String, RF_signal: String},
	SM8: {value: String, battery: String, RF_signal: String},
	SM9: {value: String, battery: String, RF_signal: String},
	SM10: {value: String, battery: String, RF_signal: String},
	SM11: {value: String, battery: String, RF_signal: String},
	SM12: {value: String, battery: String, RF_signal: String},
	SM13: {value: String, battery: String, RF_signal: String},
	SM14: {value: String, battery: String, RF_signal: String},
	SM15: {value: String, battery: String, RF_signal: String},
	SM16: {value: String, battery: String, RF_signal: String},
	SM17: {value: String, battery: String, RF_signal: String},
	SM18: {value: String, battery: String, RF_signal: String},
	SM19: {value: String, battery: String, RF_signal: String},
	SM20: {value: String, battery: String, RF_signal: String},
	time: Date,
	created_date: {
		type: Date,
		default: Date.now()
	}
}, {versionKey: false});


//Nen thiet kế theo 3 bảng : Nhà, thiết bị và data thì có thể thêm được nhà, thiết bị riêng k phải sửa code

const Data = mongoose.model("farm_data", SubstationSchema);
module.exports = Data;
