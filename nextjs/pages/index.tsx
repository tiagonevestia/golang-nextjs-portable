import Link from "next/link";
import useSWR from "swr";

import AppSwitcher from "@carbon/icons-react/lib/app-switcher/24";
import Chip from "@carbon/icons-react/lib/chip/24";
import Group from "@carbon/icons-react/lib/group/24";

import {
  HeaderContainer,
  Header,
  SideNav,
  Button,
  PageTitleBar,
} from "carbon-addons-iot-react";
import React from "react";

const RouterComponent = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

async function fetcher(url: string) {
  const resp = await fetch(url);
  return resp.text();
}

const links = [
  {
    icon: AppSwitcher,
    isEnabled: true,
    metaData: {
      onClick: () => {},
      tabIndex: 0,
      label: "Boards",
      element: RouterComponent,
    },
    linkContent: "Boards",
  },
  {
    current: true,
    isEnabled: true,
    icon: Chip,
    metaData: {
      label: "Devices",
      href: "https://google.com",
      element: "a",
      target: "_blank",
    },
    linkContent: "Devices",
  },
  {
    isEnabled: true,
    icon: Group,
    metaData: {
      label: "Members",
      element: "button",
    },
    linkContent: "Members",
    childContent: [
      {
        metaData: {
          label: "Devices",
          onClick: () => {},
          element: "button",
        },
        content: "Yet another link",
      },
    ],
  },
];

function Index(): JSX.Element {
  const { data, error } = useSWR("/api", fetcher, { refreshInterval: 1000 });

  return (
    <div>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header
              actionItems={[
                {
                  label: "user",
                  onClick: () => {},
                  btnContent: <Group />,
                },
              ]}
              appName="Watson IoT - Golang - Nextjs"
              headerPanel={{
                className: "header-panel",
                /* eslint-disable */
                content: React.forwardRef((props, ref) => (
                  <a href="#" {...props}>
                    Header panel content
                  </a>
                )),
                /* eslint-enable */
              }}
              isSideNavExpanded={isSideNavExpanded}
              onClickSideNavExpand={onClickSideNavExpand}
            />
            <SideNav
              links={links}
              isSideNavExpanded={isSideNavExpanded}
              onClickSideNavExpand={onClickSideNavExpand}
            />
          </>
        )}
      />
    </div>
  );
}

export default Index;

// <HeaderContainer>
//   <Header appName="Watson IoT" />
// </HeaderContainer>
// <Button
//   href="https://carbon-addons-iot-react.com/"
//   target="_blank"
//   onClick={() => {}}
//   onFocus={() => {}}
// >
//   Get Components
// </Button>
// <p>
//   This is <code>pages/index.tsx</code>.
// </p>
// <p>
//   Check out <Link href="/foo">foo</Link>.
// </p>

// <h2>Memory allocation stats from Go server</h2>
// {error && (
//   <p>
//     Error fetching profile: <strong>{error}</strong>
//   </p>
// )}
// {!error && !data && <p>Loading ...</p>}
// {!error && data && <pre>{data}</pre>}
