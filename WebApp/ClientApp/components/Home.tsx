import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Demo } from './Demo/Demo';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
            <Demo/>
        )
    }
}
