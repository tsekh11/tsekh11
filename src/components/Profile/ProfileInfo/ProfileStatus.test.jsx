import React from "react";
import ProfileStatus from "./ProfileStatus";
import { act, create } from "react-test-renderer";

describe("Profile status component", () => {

    test("status should be displayed in the component", () => {
        const component = create(<ProfileStatus status="test status" />);
        const instance = component.root;
        let span = instance.findByType("span")

        expect(span.children[0]).toBe("test status");
    });

    test("input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="test status" />);
        const instance = component.root;

        expect(
            ()=>{
                let input = instance.findByType("input")
            }
        ).toThrow();
    });

    test("input should be displayed with a status value", () => {
        let component
        act(() => {
            component = create(<ProfileStatus status="test status" userId={"8268"} />);
        })
        const root = component.root;
        let span = root.findByType("span")
        span.props.onClick()
        let input = root.findByType("input")

        expect(input.props.value).toBe("test status");
    });

    test("input should be changed on span when onBlur", () => {
        const mockCallBack = jest.fn()
        let component
        act(() => {
            component = create(<ProfileStatus status="test status" userId={"8268"} updateStatus={mockCallBack} />);
        })
        const root = component.root;
        let span = root.findByType("span")
        span.props.onClick()
        let input = root.findByType("input")
        input.props.onBlur()

        expect(mockCallBack.mock.calls.length).toBe(1);
    });

});