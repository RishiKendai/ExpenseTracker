import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { post } from '../../utils/magicBox'
import Colors from '../../utils/colors'
import { ObjectId } from 'bson'
import { LabelProp } from '../Settings/Label'
import { ProofProp } from '../../App'
import Spinner from '../Spinner'
import Line from '../Line'
import LinearGradient from 'react-native-linear-gradient';
import CircularProgressBar from '../CircularProgressBar'
import { PieChart, LineChart } from 'react-native-chart-kit'

type expensesProp = {
    payeeNmae: string;
    amount: number;
    expenseType: string;
    expenseId: ObjectId;
    note: string;
    label: LabelProp;
    paidAt: Date;
};

type pieCharProp = {
    name: string;
    amount: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}

type lineChartProp = {
    labels: string[];
    datasets: {
        data: number[];
        color: (opacity: number) => string;
        strokeWidth: number;
    }[];
    // legend: string[];
};

type highLowXpnseProp = {
    payeeName: string;
    amount: number;
    label: string;
};

type dataProp = {
    _id: ObjectId;
    name: string;
    expenseType: string;
    totalAmount: number;
    expenses: expensesProp[];
    amountSpent: number;
    highestExpense: highLowXpnseProp;
    leastExpense: highLowXpnseProp;
    balance: number;
    lineChartData: lineChartProp;
    pieChartData: pieCharProp[];
}

const initialState = {
    _id: new ObjectId('6479d592e8d9b0af499554d1'),
    name: '',
    expenseType: '',
    totalAmount: 0,
    expenses: [],
    amountSpent: 0,
    highestExpense: {
        payeeName: '',
        amount: 0,
        label: '',
    },
    leastExpense: {
        payeeName: '',
        amount: 0,
        label: '',
    },
    balance: 0,
    pieChartData: [],
    lineChartData: {
        labels: [],
        datasets: [],
        // legend: [],
    },
}

const Insights = ({ xpnseListId }: { xpnseListId: string }) => {
    const [xpensesData, setXpensesData] = useState(initialState);
    const [isEmptyData, setIsEmptyData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    async function fetchData() {
        const postData = {
            expenseId: xpnseListId
        }
        const response = await post(
            postData,
            'expense/insights',
            {}
        );
        if (response.data.length === 0) {
            setIsLoading(false)
            return setIsEmptyData(true)
        }
        setXpensesData(response.data);
        setIsLoading(false)
    }
    useFocusEffect(useCallback(() => {
        fetchData()
    }, []))
    const pieChartConfig = {
        backgroundGradientFrom: "#0cea70",
        backgroundGradientTo: "#dac510",
        color: (opacity = 1) => `rgba(26, 255, 146,.9)`,
        formatText: (value: any, percentage: number) => `${Math.round(percentage * 100)}%`,
    }
    const lineChartConfig = {
        backgroundGradientFrom: "#EDD185",
        backgroundGradientTo: "#E8BD70",
        color: (opacity = 1) => `rgb(26 ,26 ,27)`,
    }
    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.Screen}>
                {isLoading ? <Spinner size={43} color={Colors.dogerBlue500} msg='Rendering Dashboard' />
                    :
                    isEmptyData
                        ? <View>
                            <Text style={styles.EmptyText}>No data to show insights!</Text>
                        </View>
                        :

                        <View style={styles.Root}>
                            <View style={styles.Container1}>
                                <View style={{ flex: 1, }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3, }}>
                                        <View style={[styles.Dot, styles.TotalAmountDot]}></View>
                                        <Text style={styles.TextLabel}>Total amount</Text>
                                    </View>
                                    <Text style={{ marginLeft: 14, fontFamily: 'PTSans-Regular', color: '#ffffff', fontSize: 16 }}>₹ {xpensesData.totalAmount}</Text>
                                </View>
                                <Line customStyle={{ height: '100%', width: 1, backgroundColor: '#ffffff4c' }} />
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3, }}>
                                            <View style={[styles.Dot, styles.ExpenseSpenttDot]}></View>
                                            <Text style={styles.TextLabel}>Expenses</Text>
                                        </View>
                                        <Text style={{ marginLeft: 14, fontFamily: 'PTSans-Regular', color: '#ffffff', fontSize: 16 }}>₹ {xpensesData.amountSpent}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.Container2}>
                                <CircularProgressBar
                                    progress={+(xpensesData.amountSpent / xpensesData.totalAmount)}
                                    size={150}
                                    strokeWidth={8}
                                    textColor="#fff"
                                />
                                <View>
                                    <Text style={styles.TextLabel}>Balance</Text>
                                    <Text style={{ color: '#ffffff', fontSize: 33, fontFamily: 'PTSans-Bold' }}>₹ {xpensesData.balance}</Text>
                                </View>
                            </View>
                            <View style={styles.Container3}>
                                <View style={styles.Card}>
                                    <LinearGradient style={styles.CardInner} colors={['#f85032d4', '#e73727dd']}>
                                        <Text style={[styles.TextLabel, { fontSize: 16, color: '#ffffffac' }]}>Highest Expense</Text>
                                        <Text style={[styles.TextLabel, { color: '#ffffff', fontWeight: '500' }]}>₹ {xpensesData.highestExpense.amount}</Text>
                                        <Text style={[styles.TextLabel, { color: '#ffffffdc', }]}>{xpensesData.highestExpense.payeeName}</Text>
                                        <Text style={[styles.TextLabel, { color: '#ffffffcc', fontSize: 14 }]}>({xpensesData.highestExpense.label})</Text>
                                    </LinearGradient>
                                </View>
                                <View style={styles.Card}>
                                    <LinearGradient style={styles.CardInner} colors={['#5F00FB', '#003F63']}>
                                        <Text style={[styles.TextLabel, { fontSize: 16, color: '#ffffffac' }]}>Least Expense</Text>
                                        <Text style={[styles.TextLabel, { color: '#ffffff', fontWeight: '500' }]}>₹ {xpensesData.leastExpense.amount}</Text>
                                        <Text style={[styles.TextLabel, { color: '#ffffffdc', }]}>{xpensesData.leastExpense.payeeName}</Text>
                                        <Text style={[styles.TextLabel, { color: '#ffffffcc', fontSize: 14 }]}>({xpensesData.leastExpense.label})</Text>
                                    </LinearGradient>
                                </View>
                            </View>
                            <View style={styles.Container4}>
                                <PieChart
                                    data={xpensesData.pieChartData}
                                    width={Dimensions.get('window').width}
                                    height={220}
                                    chartConfig={pieChartConfig}
                                    accessor={"amount"}
                                    backgroundColor={"transparent"}
                                    paddingLeft={"-20"}
                                    center={[10, 5]}
                                />
                            </View>
                            <View style={styles.Container5}>
                                <LineChart
                                    data={xpensesData.lineChartData}
                                    width={Dimensions.get('window').width - 20}
                                    height={220}
                                    chartConfig={lineChartConfig}
                                    withInnerLines={false}
                                    withHorizontalLines={false}
                                    withVerticalLines={false}
                                />
                            </View>
                        </View>
                }
            </View>
        </ScrollView>
    )
}
export default Insights

const styles = StyleSheet.create({
    Screen: {
        flex: 1,
        paddingHorizontal: 13,
    },
    EmptyText: {
        fontSize: 16,
        marginTop: 12,
        textAlign: 'center',
        fontFamily: 'Inika-Bold',
    },
    Root: {
        flex: 1,
        paddingTop: 28,
    },
    TextLabel: {
        fontSize: 20,
        color: '#ffffff8c',
        fontFamily: 'PTSans-Bold'
    },
    Container1: {
        flexDirection: 'row',
        marginBottom: 42,
    },
    Dot: {
        height: 8,
        width: 8,
        borderRadius: 100,
    },
    TotalAmountDot: {
        backgroundColor: Colors.dogerBlue500,
    },
    ExpenseSpenttDot: {
        backgroundColor: Colors.royalIndigo500,
    },
    Container2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 62,
        marginBottom: 32,
    },
    Container3: {
        flexDirection: 'row',
        gap: 18,
        marginBottom: 22,
    },
    Card: {
        width: 180,
    },
    CardInner: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    Container4: {
        marginBottom: 22,

    },
    Container5: {
        marginBottom: 22,
        borderRadius: 17,
        overflow: 'hidden',
        backgroundColor: 'red',
    },
});