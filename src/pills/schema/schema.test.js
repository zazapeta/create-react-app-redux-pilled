import React from 'react';
import { render } from 'enzyme';
import { Provider } from 'react-redux';

import store from '../../redux-utils/store';

import { addEntities } from './schema.actions';
import { schemaSelectorCreator } from './schema.selectors';
import SchemaReducer from './schema.reducer';
import SchemaContainer from './schema.container';

describe('Schema container', () => {
  it('Should render', () => {
    expect(
      render(
        <Provider store={store}>
          <SchemaContainer
            mapStateToProps={() => ({
              just: 'a props',
            })}
            render={(props) => {
              expect(props.just).toEqual('a props');
              return <div />;
            }}
          />
        </Provider>,
      ),
    ).toBeDefined();
  });
});

describe('Schema actions - reducers - selector', () => {
  it('Should add an entity into the store', () => {
    let state = {
      entities: {},
    };
    state = SchemaReducer(
      state,
      addEntities({ users: [{ id: 1, name: 'jhon' }, { id: 2, name: 'doe' }] }),
    );
    expect(state).toEqual({
      entities: {
        users: [{ id: 1, name: 'jhon' }, { id: 2, name: 'doe' }],
      },
    });
  });

  it('Should add multiple entity into the store', () => {
    let state = {
      entities: {},
    };
    state = SchemaReducer(
      state,
      addEntities({ users: [{ id: 1, name: 'jhon' }, { id: 2, name: 'doe' }] }),
    );
    state = SchemaReducer(
      state,
      addEntities({ cars: [{ id: 1, name: 'audi' }, { id: 2, name: 'fiat' }] }),
    );
    expect(state).toEqual({
      entities: {
        users: [{ id: 1, name: 'jhon' }, { id: 2, name: 'doe' }],
        cars: [{ id: 1, name: 'audi' }, { id: 2, name: 'fiat' }],
      },
    });
  });

  it('Should return a selector', () => {
    const userSelector = schemaSelectorCreator('users', []);
    expect(typeof userSelector === 'function').toEqual(true);
  });

  it('Should created selector return default value if none in the store', () => {
    let state = {
      Schema: {
        entities: {},
      },
    };
    const userSelector = schemaSelectorCreator('users', []);
    expect(userSelector(state)).toEqual([]);
  });

  it('Should created selector return the stored values', () => {
    let state = {
      Schema: {
        entities: {
          users: [{ id: 1, name: 'jhon' }, { id: 2, name: 'doe' }],
        },
      },
    };
    const userSelector = schemaSelectorCreator('users', []);
    expect(userSelector(state)).toEqual(state.Schema.entities.users);
  });
});
