import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import createDatesArr from "../helpers/formatDate";
import moment from "moment";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import getData from "../services/service";

// Make the histogram period
//  Implement loading animation (e.g. spinner) while waiting for API response

const CommitHistogramChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [start, setStart] = useState(new Date());
  const { dates, months } = createDatesArr(start);

  async function commitData() {
    setLoading(true);
    let _val;
    try {
      const val = await Promise.all(
        dates.map(async (date) => {
          return await getData(date);
        })
      );
      _val = val.map((el) => (typeof el === "number" ? el : 0));
      setChartData(_val);
    } catch {
      setError(true);
    }
    _val.reduce((a, b) => a + b) <= 0 ? setError(true) : setError(false);
    setLoading(false);
  }

  useEffect(() => {
    commitData();
  }, [start]);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const _data = {
    labels: months,
    datasets: [
      {
        data: chartData ? chartData : [],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Fetch commits information from Apple's Swift"], //
  };
  const windowWidth = Dimensions.get("window").width;

  const handleSetStart = (event, selectedDate) => {
    setStart(selectedDate);
  };
  return (
    <View>
      <RNDateTimePicker
        onChange={(event, selectedDate) => handleSetStart(event, selectedDate)}
        value={start}
      />
      {error ? (
        <View>
          <Text style={{ color: "red" }}>
            Oops, looks like there is no data from API
          </Text>
        </View>
      ) : (
        <ScrollView horizontal={true}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <LineChart
              data={_data}
              width={windowWidth}
              height={220}
              chartConfig={chartConfig}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default CommitHistogramChart;
