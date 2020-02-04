/**
 * 常用的下拉选项
 */
import { RecentDateType, RecentDateTypeText } from './type'
export const DEFAULT_VALUE = ''

export const boolSelectOptions = [
    { name: '不限', value: DEFAULT_VALUE },
    { name: '是', value: 1 },
    { name: '否', value: 0 },
]

export const platSelectOptions = [
    { name: '不限', value: DEFAULT_VALUE },
    { name: 'app', value: 'app' },
    { name: 'ott', value: 'ott' },
    { name: 'pc', value: 'pc' },
    { name: 'wap', value: 'wap' },
]


export const compareOptions = [
    { name: '等于', value: 1 }, 
    { name: '不等于', value: 2 }, 
    { name: '包含', value: 5 }, 
    { name: '不包含', value: 6 }, 
    { name: '模糊查询', value: 10 }, 
    { name: '不小于', value: 3 }, 
    { name: '不大于', value: 4 }, 
    { name: '大于', value: 8 }, 
    { name: '小于', value: 9 }
]

export const sortOptions = [
    { name: '正序', value: 'true' }, 
    { name: '倒序', value: 'false' }, 
]

/// 用户群
export const normalRecentDateOptions = [
    { 
        name: '不限', 
        value: DEFAULT_VALUE 
    },
    {
        name: RecentDateTypeText[RecentDateType.last7Days],
        value: RecentDateType.last7Days
    },
    {
        name: RecentDateTypeText[RecentDateType.last15Days],
        value: RecentDateType.last15Days
    },
    {
        name: RecentDateTypeText[RecentDateType.last30Days],
        value: RecentDateType.last30Days
    }
]