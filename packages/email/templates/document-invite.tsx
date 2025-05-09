import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import type { RecipientRole } from '@prisma/client';

import { RECIPIENT_ROLES_DESCRIPTION } from '@documenso/lib/constants/recipient-roles';

import { Body, Container, Head, Hr, Html, Img, Link, Preview, Section, Text } from '../components';
import { useBranding } from '../providers/branding';
import type { TemplateDocumentInviteProps } from '../template-components/template-document-invite';
import { TemplateDocumentInvite } from '../template-components/template-document-invite';
import { TemplateFooter } from '../template-components/template-footer';

export type DocumentInviteEmailTemplateProps = Partial<TemplateDocumentInviteProps> & {
  customBody?: string;
  role: RecipientRole;
  selfSigner?: boolean;
  isTeamInvite?: boolean;
  teamName?: string;
  teamEmail?: string;
  includeSenderDetails?: boolean;
};

export const DocumentInviteEmailTemplate = ({
  inviterName = 'Signflow Team',
  inviterEmail = 'noreply@signflow.com',
  documentName = 'Document.pdf',
  signDocumentLink = 'https://signflow.com',
  assetBaseUrl = 'https://signflow.com',
  customBody,
  role,
  selfSigner = false,
  isTeamInvite = false,
  teamName = '',
  includeSenderDetails,
}: DocumentInviteEmailTemplateProps) => {
  const { _ } = useLingui();
  const action = _(RECIPIENT_ROLES_DESCRIPTION[role].actionVerb).toLowerCase();

  let previewText = msg`${inviterName} has invited you to ${action} ${documentName}`;

  if (isTeamInvite) {
    previewText = includeSenderDetails
      ? msg`${inviterName} on behalf of "${teamName}" has invited you to ${action} ${documentName}`
      : msg`${teamName} has invited you to ${action} ${documentName}`;
  }

  if (selfSigner) {
    previewText = msg`Please ${action} your document ${documentName}`;
  }

  const getAssetUrl = (path: string) => {
    return new URL(path, assetBaseUrl).toString();
  };

  return (
    <Html>
      <Head />
      <Preview>{_(previewText)}</Preview>
      <Body className="mx-auto my-auto bg-[#f8fafc] font-sans">
        <Section>
          <Container className="mx-auto mb-2 mt-8 max-w-xl rounded-2xl border border-solid border-slate-200 bg-white p-8 shadow-xl">
            <Section className="flex flex-col items-center">
              <Img
                src={getAssetUrl('/static/signflow-logo.png')}
                alt="Signflow Logo"
                className="mb-6 h-10 mx-auto"
              />
              <Text className="text-2xl font-bold text-center text-gray-900 mb-2">
                {isTeamInvite ? (
                  <Trans>You've been invited to collaborate on a document</Trans>
                ) : (
                  <Trans>You've been invited to sign a document</Trans>
                )}
              </Text>
              <Text className="text-base text-center text-gray-700 mb-6">
                {customBody ? (
                  <pre className="font-sans text-base text-gray-700 whitespace-pre-wrap">{customBody}</pre>
                ) : (
                  <Trans>
                    {inviterName} has invited you to {action} the document "{documentName}".
                  </Trans>
                )}
              </Text>
              <a
                href={signDocumentLink}
                style={{
                  display: 'inline-block',
                  background: '#2563eb',
                  color: '#fff',
                  padding: '12px 32px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '16px',
                  textDecoration: 'none',
                  marginBottom: '24px',
                }}
              >
                <Trans>Open Document</Trans>
              </a>
              <Hr className="my-8" />
              <Text className="text-xs text-center text-gray-400">
                If you have questions, contact us at <a href="mailto:support@signflow.com" style={{ color: '#2563eb' }}>support@signflow.com</a>.
              </Text>
            </Section>
          </Container>
          <Container className="mx-auto mt-8 max-w-xl">
            <Section>
              <Text className="text-center text-xs text-gray-400 mt-8">
                Signflow Pty Ltd<br />90 King William Street, Adelaide SA 5000
              </Text>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

export default DocumentInviteEmailTemplate;
