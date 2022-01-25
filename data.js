const subjectsData = {
    ce: {},
    mech: {},
    eee: {},
    ece: {
        S3: [{
            name: 'Partial Differential Equation And Complex Analysis',
            code: 'MAT201'
        }, {
            name: 'Solid State Devices',
            code: 'ECT201'
        }, {
            name: 'Logic Circuit Design',
            code: 'ECT203'
        }, {
            name: 'Network Theory',
            code: 'ECT205'
        }, {
            name: 'Design And Engineering',
            code: 'EST200'
        }, {
            name: 'Professional Ethics',
            code: 'HUT200'
        }, {
            name: 'Sustainable Engineering',
            code: 'MCN201'
        }, {
            name: 'Scientific Computing Lab',
            code: 'ECL201'
        }, {
            name: 'Logic Design Lab',
            code: 'ECL203'
        }]
    },
    cse: {},
    ce: {},
    archi: {}
}

const studyMaterials = {
    ECT201: {
        name: 'Solid State Devices',
        materials: [{
            type: 'file',
            name: 'SSD Text book',
            file: 'BQACAgUAAxkBAAIClV99tyjS1GN4h8x-G0LcoYpq4k0QAAJMAQAC4rjxV3UhsV8XHsy5GwQ'
        }, {
            type: 'youtube',
            name: 'Youtue Videos',
            links: 'https://elabins.com'
        }]
    }
}

module.exports.subjectsData = subjectsData
module.exports.studyMaterials = studyMaterials