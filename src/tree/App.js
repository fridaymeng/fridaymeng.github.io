import React, { Component } from 'react';
import { uuid } from "../utils/uuid";
import EventEmitter from "../utils/events";
import './App.less';
import { Select, Button, Switch, Input } from 'antd';

const Option = Select.Option;

class GenerateGroupExpression extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(checked) {
    EventEmitter.trigger("recordData", {
      type: "gate",
      data: checked ? "and" : "or",
      groupIndex: this.props.index,
      parentIndex: this.props.parentIndex,
      order: this.props.order
    });
  }
  render() {
    return (
      <div
        className="selectGroupLi"
        data-id={this.props.id}
        data-index={this.props.index}
        data-order={this.props.order}
        data-parent-index={this.props.parentIndex}
      >
        <div
          style={{
            padding: "0px 0 5px 0px",
            overflow: "hidden",
            position: "relative"
          }}
        >
          <Button
            type="danger"
            icon="close"
            data-index={this.props.index}
            data-parent-index={this.props.parentIndex}
            data-order={this.props.order}
            className={this.props.index === 0 ? "hide" : ""}
            onClick={this.props.delGroupExpression}
            style={{
              margin: "0 0 0 5px",
              float: "right"
            }}
          >
            删除分组
          </Button>
          <Button
            icon="plus"
            data-index={this.props.index}
            data-parent-index={this.props.parentIndex}
            data-order={this.props.order}
            onClick={this.props.addGroupExpression}
            className={this.props.index !== "false " ? "" : "hide"} //默认只显示一个添加按钮
            style={{
              margin: "0 0 0 6px",
              float: "right"
            }}
          >
            添加分组
          </Button>
          <Switch
            checkedChildren="AND"
            unCheckedChildren="OR"
            defaultChecked={this.props.gate === "and" ? true : false}
            onChange={this.onChange}
          />
        </div>
        {this.props.data.map((item, index) => {
          item.rightClassName = item.rightClassName ? item.rightClassName : "";
          item.rightClassName = "hide";
          return (
            <GenerateSingleExpression
              groupIndex={this.props.index}
              parentIndex={this.props.parentIndex}
              groupLth={this.props.groupLth}
              order={this.props.order}
              index={index}
              data={item}
              total={this.props.data.length}
              key={Math.random()}
              delOneExpression={this.props.delOneExpression}
              addOneExpression={this.props.addOneExpression}
              allFields={this.props.allFields}
              allParams={this.props.allParams}
            />
          );
        })}
        {this.props.childrens}
      </div>
    );
  }
}

class GenerateSingleExpression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allFields: this.props.allFields,
      leftFields: this.props.allFields,
      rightFields: this.props.data.rightFields || [],
      rightClassName: this.props.data.rightClassName
    };
    this.selectExpression = this.selectExpression.bind(this);
  }
  selectExpression(data){
    let className = "";
    if(data.id === 2 || data.id === 3){
      className = "hide";
    }
    this.setState({
      rightClassName : className
    });
  }
  handleInputChange(e){
    const target = e.target;
    const data = target.dataset;
    EventEmitter.trigger("recordData",{
      type : "right",
      value : target.value,
      order : data.order,
      index : data.index
    });
  }
  render() {
    return (
      <div className="selectListLi">
        <SelectList
          key={Math.random()}
          data={this.props.data}
          groupIndex={this.props.groupIndex}
          parentIndex={this.props.parentIndex}
          order={this.props.order}
          index={this.props.index}
          type="left"
          allFields={this.state.leftFields}
          defaultValue={this.state.leftDefaultValue}
          search="true"
          className={
            this.props.data.leftClassName ? this.props.data.leftClassName : ""
          }
        />
        <OperatorSelectList
          key={Math.random()}
          data={this.props.data}
          index={this.props.index}
          groupIndex={this.props.groupIndex}
          parentIndex={this.props.parentIndex}
          order={this.props.order}
          selectExpression={this.selectExpression}
          className={
            this.props.data.operatorClassName
              ? this.props.data.operatorClassName
              : ""
          }
        />
        <Input 
          placeholder="请输入内容" 
          data-order={this.props.order}
          data-index={this.props.index}
          onChange={this.handleInputChange}
          type="right"
          className={this.state.rightClassName ? this.state.rightClassName : ""}
          style={{ width: 150}}
        />
        <div>
          <Button
            icon="close-circle"
            data-group-index={this.props.groupIndex}
            data-expression-index={this.props.index}
            data-parent-index={this.props.parentIndex}
            data-order={this.props.order}
            onClick={this.props.delOneExpression}
            type="danger"
            className={
              this.props.total === 1 && this.props.groupLth === 0 ? "hide" : ""
            }
            style={{
              margin: "0 0 0 6px"
            }}
          >
            删除
          </Button>
        </div>
        <div>
          <Button
            icon="plus-circle"
            data-group-index={this.props.groupIndex}
            data-expression-index={this.props.index}
            data-parent-index={this.props.parentIndex}
            data-order={this.props.order}
            onClick={this.props.addOneExpression}
            type="primary"
            className={
              this.props.total > 1 && this.props.index < this.props.total - 1
                ? "hide"
                : ""
            } //默认只显示一个添加按钮
            style={{
              margin: "0 0 0 6px"
            }}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

class SelectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsArr: this.props.allFields,
      className: "class-" + uuid(10, 16) + " " + this.props.className,
      defaultValue: this.props.defaultValue
    };
  }
  handleChange = index => {};
  render() {
    return (
      <div>
        <Select
          className={this.state.className}
          defaultValue={this.state.defaultValue}
          showSearch={this.props.search === "true" ? true : false}
          style={{ width: 200 }}
          onChange={this.handleChange}
          getPopupContainer={() =>
            document.getElementById("tree-id")
          }
          autoClearSearchValue={false}
          placeholder="请选择..."
          filterOption={(input, option) => {
            return (
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            );
          }}
        >
          {this.state.optionsArr &&
            this.state.optionsArr.map((item, index) => (
              <Option
                key={Math.random()}
                value={index}
              >
                {item.name}
              </Option>
            ))}
        </Select>
      </div>
    );
  }
}
class OperatorSelectList extends React.Component {
  state = {
    defaultValue: undefined,
    expressions: [{name:"等于",id:0,symbol:"="},{name:"不等于",id:1,symbol:"!="},{name:"非空",id:2,symbol:"is not null"},{name:"空",id:3,symbol:"is null"}]
  };
  handleChange = index => {
    const expression = this.state.expressions[index];
    this.props.selectExpression(expression);
    EventEmitter.trigger("refreshExpressionList", {
      type: "operator",
      data: expression,
      index: this.props.index,
      order: this.props.order,
      groupIndex: this.props.groupIndex,
      parentIndex: this.props.parentIndex
    });
  };
  render() {
    return (
      <div>
        <Select
          className={
            this.props.data.operationClassName
              ? this.props.data.operationClassName
              : ""
          }
          defaultValue={this.state.defaultValue}
          style={{ width: 100, margin: "0 6px 0 6px" }}
          placeholder="请选择运算符"
          optionFilterProp="children"
          onChange={this.handleChange}
          getPopupContainer={() =>
            document.getElementById("tree-id")
          }
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {this.state.expressions.map((item, index) => (
            <Option
              key={Math.random()}
              value={index}
            >
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      group: [
        {
          gate: "and",
          expressionList: [{}],
          group: [],
          id: 0
        }
      ],
      allFields: [{name:"id"},{name:"user"},{name:"age"},{name:"nation"}],
      refresh: true
    };
    this.count = 0;
    this.addOneExpression = this.addOneExpression.bind(this);
    this.delOneExpression = this.delOneExpression.bind(this);
    this.addGroupExpression = this.addGroupExpression.bind(this);
    this.delGroupExpression = this.delGroupExpression.bind(this);
  }
  componentDidMount(){
    const $this = this;
    /* 注册refreshExpressionList */
    EventEmitter.off("refreshExpressionList");
    EventEmitter.on("refreshExpressionList", function(params) {
      switch(params.type){
        case "operator":
          //console.log($this.state.group);
        break;
        default:
      };
      $this.setState({
        refresh : false
      });
    });
    /* 注册recordData */
    EventEmitter.off("recordData");
    EventEmitter.on("recordData", function(params) {
      switch(params.type){
        case "left":
          console.log(params);
        break;
        case "right":
          console.log(params);
        break;
        case "operator":
          console.log(params);
        break;
        default:
      }
      $this.setState({
        refresh: false
      });
    });
  }
  renderGroup(params) {
    let $dom = [];
    let $domChild = [];
    params.data && params.data.forEach((item, index) => {
      if (item.group && item.group.length > 0) {
        $domChild.push(this.renderGroup({data : item.group, index : index + 1}));
      }
      if (
        params.data[index].expressionList.length === 0 &&
        params.data[index].group &&
        params.data[index].group.length === 0
      ) {
        params.data[index].expressionList.push({});
      }
      if (!params.data[index].group && params.data[index].expressionList.length === 0) {
        params.data[index].expressionList.push({});
      }
      $dom.push(
        <GenerateGroupExpression
          key={Math.random()}
          index={item.id}
          parentIndex={item.parentId !== undefined ? item.parentId : "false"}
          order={index}
          id={uuid(10, 16)}
          total={params.data.length}
          gate={params.data[index].gate}
          data={params.data[index].expressionList}
          groupLth={item.group ? item.group.length : 0}
          allFields={this.state.allFields}
          allParams={this.props.allParams}
          delOneExpression={this.delOneExpression}
          addOneExpression={this.addOneExpression}
          delGroupExpression={this.delGroupExpression}
          addGroupExpression={this.addGroupExpression}
          childrens={$domChild}
        />
      );
    });
    return $dom;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.refresh) {
      return false;
    } else {
      return true;
    }
  }
  /*** 添加单个表达式 ***/
  addOneExpression(obj) {
    const $target = obj.target.dataset;
    const $index = $target.groupIndex;
    const $parentIndex = $target.parentIndex;
    const $order = $target.order;
    if ($parentIndex === "false") {
      this.state.group[$index].expressionList.push({});
    } else {
      this.state.group[$parentIndex].group[$order].expressionList.push({});
    }
    this.setState({
      group: this.state.group,
      refresh: true
    });
  }
  /*** 删除单个表达式 ***/
  delOneExpression(obj) {
    const $data = obj.target.dataset;
    const $index = Number.parseInt($data.groupIndex, 10);
    const $parentIndex = $data.parentIndex;
    const $order = $data.order;
    const $expressionIndex = $data.expressionIndex;
    if ($parentIndex === "false") {
      this.state.group[$index].expressionList.splice($data.expressionIndex, 1);
    } else {
      this.state.group[$parentIndex].group[$order].expressionList.splice(
        $expressionIndex,
        1
      );
    }
    this.setState({
      expressionList: this.state.group,
      refresh: true
    });
  }
  findId(group,params){
    group.map((item,index) => {
      if(params.parentIndex === "false"){
        item.group.push({
          gate: "and",
          expressionList: [{}],
          group: [],
          id: ++this.count,
          parentId: 0
        });
      }else{
        if(Number(params.index) === item.id && Number(params.parentIndex) === item.parentId){
          item.group.push({
            gate: "and",
            expressionList: [{}],
            group: [],
            id: ++this.count,
            parentId: item.parentId + 1
          });
        }
        this.findId(item.group,params);
      }
      return item;
    });
  }
  /*** 添加单个表达式分组 ***/
  addGroupExpression(e) {
    const $data = e.target.dataset;
    this.findId(this.state.group,$data);
    this.forceUpdate();
  }
  /*** 删除单个表达式分组 ***/
  delGroupExpression(e) {
    const $data = e.target.dataset;
    const $order = $data.order;
    const $parentIndex = $data.parentIndex;
    if($parentIndex !== "false"){
      this.state.group[$parentIndex].group.splice($order, 1);
      this.setState({
        group: this.state.group,
        refresh: true
      });
    };
  }
  render(){
    return (
      <div className="tree-wrap" id="tree-id">
        <div className="selectGroupWrap">
          {this.renderGroup({data : this.state.group})}
        </div>
      </div>
    );
  }
}

export default App;