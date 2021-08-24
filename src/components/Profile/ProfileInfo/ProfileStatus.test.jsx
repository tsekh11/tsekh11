import React from "react";
import ProfileStatus from "./ProfileStatus";
import { create } from "react-test-renderer";

describe("Profile status component", () => {
    test("status should be displayed in the component", () => {
        const component = create(<ProfileStatus status="test status" />);
        const instance = component.root;
        let span = instance.findByType("span")

        expect(span.children[0]).toBe("test status");
    });
});