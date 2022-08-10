<template>
  <div>
    <my-table :col="col" :data="data" :objectSpanMethod="objectSpanMethod"></my-table>
  </div>
</template>
<script>
import MyTable from './common/MyTable';

export default {
  components: {
    MyTable
  },
  data() {
    return {
      col: [
        {
          prop: 'date',
          label: '日期'
        },
        {
          label: '配送信息',
          children: [
            {
              prop: 'name',
              label: '姓名'
            },
            {
              label: '地址',
              children: [
                {
                  prop: 'province',
                  label: '省份'
                },
                {
                  prop: 'city',
                  label: '市区'
                },
                {
                  prop: 'address',
                  label: '地址'
                }
              ]
            }
          ]
        }
      ],
      data: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      objectSpanMethod: ({ row, column, rowIndex, columnIndex }) => {
        console.log(row, column, rowIndex, columnIndex);
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          }

          return {
            rowspan: 0,
            colspan: 0
          };

        }
      }
    };
  },
  methods: {}
};
</script>
