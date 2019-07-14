import React from "react";
import SaveChangeButton from "../component/saveChanges";
import { configure, shallow, cleanup, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

afterEach = () => {
  cleanup;
};

describe("<SaveChangeButton/>", () => {
  it("renders correctly", () => {
    const wrapper = renderer.create(<SaveChangeButton />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it("verify whether the error throw is updated to state", () => {
    const wrapper = mount(<SaveChangeButton />);
    wrapper.setProps({ chekCancelStatus: true, titledata: "", backImg: "" });
    wrapper.find("button").simulate("click");
    expect(wrapper.instance().state).toStrictEqual({
      saveDataToDb: true,
      statusInSave: true,
      natureOfErrInSave: "error",
      messageInSave: "please fill Title & Upload Image",
      preloader: true
    });
  });
  it("verify whether the error throw is updated to state", () => {
    const wrapper = mount(<SaveChangeButton />);
    const spy = jest.spyOn(wrapper.instance(), "getUpdatedWithProps");
    wrapper.setProps({ chekCancelStatus: true, titledata: "", backImg: "" });
    wrapper.find("button").simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("verify the update and cancel button have been rendered correctly", () => {
    const wrapper = mount(<SaveChangeButton />);
    wrapper.setProps({ chekCancelStatus: false });
    expect(wrapper.find("button").length).toBe(2);
  });

  it("verify the save button have been rendered correctly", () => {
    const wrapper = mount(<SaveChangeButton />);
    wrapper.setProps({ chekCancelStatus: true });
    expect(wrapper.find("button").length).toBe(1);
  });
});
