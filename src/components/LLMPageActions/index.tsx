import clsx from 'clsx';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

type Props = {
  llmsPath: string;
  pageTitle: string;
  publicPageUrl: string;
};

type ActionItem = {
  id: string;
  label: string;
  description: string;
  href?: string;
  external?: boolean;
  onClick?: () => Promise<unknown> | void;
  icon: React.ReactNode;
};

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
      <path
        fill="currentColor"
        d="M16 1H6a3 3 0 0 0-3 3v10h2V4a1 1 0 0 1 1-1h10V1Zm3 4H10a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3Zm1 15a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v12Z"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
      <path
        fill="currentColor"
        d="M7 2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm6 1.5V8h4.5L13 3.5ZM9 11h6v2H9v-2Zm0 4h6v2H9v-2Z"
      />
    </svg>
  );
}

function ChatGPTIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
      <path
        fill="currentColor"
        d="M11.7 2a4.7 4.7 0 0 0-4.04 2.28A4.7 4.7 0 0 0 3 9a4.7 4.7 0 0 0 .64 2.37A4.7 4.7 0 0 0 6 18.7a4.7 4.7 0 0 0 4.28 3.3 4.7 4.7 0 0 0 3.74-1.83A4.7 4.7 0 0 0 21 15a4.7 4.7 0 0 0-.64-2.37A4.7 4.7 0 0 0 18 5.3 4.7 4.7 0 0 0 13.72 2h-2.02Zm-2.02 2h4.04a2.7 2.7 0 0 1 2.32 1.33l1.42 2.45-1.74 1L14.3 6.33A2.7 2.7 0 0 0 12 5H9.18l.5-1Zm-3.94 2.3L7.15 9H4.99a2.7 2.7 0 0 1 .75-2.7Zm10.93.28A2.7 2.7 0 0 1 19 9c0 .43-.1.86-.3 1.24l-1.08 1.87-1.74-1 1.42-2.45c.24-.41.37-.89.37-1.38ZM6.52 10.8l1.74 1-1.42 2.45A2.7 2.7 0 0 1 4.16 15c0-.43.1-.86.3-1.24l1.08-1.87Zm8.96 1.4 1.74 1-1.08 1.87A2.7 2.7 0 0 1 13.72 17h-2.83l-1-1.73h4.1a2.7 2.7 0 0 0 1.49-.47ZM8.29 13.9 9.7 16.33A2.7 2.7 0 0 0 12 17.66h2.82l-.5 1A2.7 2.7 0 0 1 12 20a2.7 2.7 0 0 1-2.32-1.33L8.26 16.2l.03-2.3Zm1.52-7.57H12c.96 0 1.85.51 2.33 1.33l1.42 2.45-2 1.15-1.42-2.45A.7.7 0 0 0 11.72 8H8.9l.91-1.67Zm1.95 5.2 2 1.15-1.42 2.45a.7.7 0 0 1-.61.35H8.9l-.91-1.67h2.82c.25 0 .49-.06.71-.17Zm-2.52-.7-2-1.15L8.32 7.2A.7.7 0 0 1 8.93 6.86h2.82l-.91 1.67H9.13a.7.7 0 0 0-.61.35L7.24 10.13Z"
      />
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <span aria-hidden="true" className={styles.wordmarkIcon}>
      AI
    </span>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.externalIcon}>
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
      />
    </svg>
  );
}

export default function LLMPageActions({
  llmsPath,
  pageTitle,
  publicPageUrl,
}: Props): React.ReactElement {
  const menuRef = useRef<HTMLDivElement>(null);
  const resolvedLlmsPath = useBaseUrl(llmsPath);
  const [isOpen, setIsOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [statusText, setStatusText] = useState('Copy page');
  const [publicLlmsUrl, setPublicLlmsUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPublicLlmsUrl(new URL(resolvedLlmsPath, window.location.origin).toString());
    }
  }, [resolvedLlmsPath]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleClickOutside(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  function queueStatusReset() {
    window.setTimeout(() => setStatusText('Copy page'), 2200);
  }

  async function loadMarkdown() {
    const response = await fetch(resolvedLlmsPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown: ${response.status}`);
    }

    return response.text();
  }

  async function copyMarkdown() {
    setIsBusy(true);

    try {
      const markdown = await loadMarkdown();
      await navigator.clipboard.writeText(markdown);
      setStatusText('Copied');
      queueStatusReset();
      return true;
    } catch {
      setStatusText('Copy failed');
      queueStatusReset();
      return false;
    } finally {
      setIsBusy(false);
      setIsOpen(false);
    }
  }

  const chatPrompt = useMemo(() => {
    const llmsUrl = publicLlmsUrl || resolvedLlmsPath;
    return encodeURIComponent(
      `Use this documentation as the source of truth and help me with ${pageTitle}: ${llmsUrl}. Public page: ${publicPageUrl}`,
    );
  }, [pageTitle, publicLlmsUrl, publicPageUrl, resolvedLlmsPath]);

  const items: ActionItem[] = [
    {
      id: 'copy',
      label: 'Copy page',
      description: 'Copy page as Markdown for LLMs',
      onClick: copyMarkdown,
      icon: <CopyIcon />,
    },
    {
      id: 'markdown',
      label: 'View as Markdown',
      description: 'Open the llms.txt source',
      href: resolvedLlmsPath,
      external: true,
      icon: <FileIcon />,
    },
    {
      id: 'chatgpt',
      label: 'Open in ChatGPT',
      description: 'Open ChatGPT with the llms.txt link',
      href: `https://chatgpt.com/?q=${chatPrompt}`,
      external: true,
      icon: <ChatGPTIcon />,
    },
    {
      id: 'claude',
      label: 'Open in Claude',
      description: 'Open Claude with the llms.txt link',
      href: `https://claude.ai/new?q=${chatPrompt}`,
      external: true,
      icon: <ClaudeIcon />,
    },
  ];

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className={styles.triggerLabel}>
          <CopyIcon />
          {isBusy ? 'Working...' : statusText}
        </span>
        <span className={clsx(styles.chevron, isOpen && styles.chevronOpen)} aria-hidden="true">
          ^
        </span>
      </button>

      {isOpen ? (
        <div className={styles.menu} role="menu" aria-label="Page actions">
          {items.map((item) =>
            item.href ? (
              <a
                key={item.id}
                className={styles.menuItem}
                href={item.href}
                role="menuitem"
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.itemIcon}>{item.icon}</span>
                <span className={styles.itemBody}>
                  <span className={styles.itemHeading}>{item.label}</span>
                  <span className={styles.itemDescription}>{item.description}</span>
                </span>
                {item.external ? <ExternalIcon /> : null}
              </a>
            ) : (
              <button
                key={item.id}
                type="button"
                className={styles.menuItem}
                role="menuitem"
                onClick={item.onClick}
              >
                <span className={styles.itemIcon}>{item.icon}</span>
                <span className={styles.itemBody}>
                  <span className={styles.itemHeading}>{item.label}</span>
                  <span className={styles.itemDescription}>{item.description}</span>
                </span>
                {item.external ? <ExternalIcon /> : null}
              </button>
            ),
          )}
        </div>
      ) : null}
    </div>
  );
}
