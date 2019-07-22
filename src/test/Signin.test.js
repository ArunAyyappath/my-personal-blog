import React from "react";
import { CustomSignUp } from "../component/signIn";
import { configure, shallow, cleanup, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

afterEach = () => {
  cleanup;
};

describe("<CustomSignUp/>", () => {
  it("renders correctly", () => {
    const wrapper = renderer.create(<CustomSignUp />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it("check-signin-function-call-times", () => {
    const reduxspy = jest.fn();
    const wrapper = shallow(<CustomSignUp onUserClick={reduxspy} />);

    const spy = jest.spyOn(wrapper.instance(), "onclickHandleChange");
    const spyFnc = jest.spyOn(wrapper.instance(), "authListnerChange");
    wrapper.setState({
      userId: "arunayyappath@gmail.com",
      passwordId: "123456"
    });
    wrapper.find("button").simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFnc).toHaveBeenCalledTimes(1);
  });

  it("verify-signin-userId", () => {
    const wrapper = mount(<CustomSignUp />);
    const container = wrapper.find("input[type='text']");
    container.find("input[type='text']").simulate("change", {
      target: { id: "userId", value: "Fakeuser@gmail.com" }
    });
    expect(wrapper.instance().state.userId).toBe("Fakeuser@gmail.com");
  });

  it("verify-signin-passwordId", () => {
    const wrapper = mount(<CustomSignUp />);
    const container = wrapper.find("input[type='text']");
    container.find("input[type='text']").simulate("change", {
      target: { id: "passwordId", value: "12345678" }
    });
    expect(wrapper.instance().state.passwordId).toBe("12345678");
  });
});
